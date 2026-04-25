import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import uglifyjs from 'uglify-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let css = '';
let js = '';

function handleFolder(folderPath, excludingFileName) {
  fs.readdirSync(folderPath).forEach((item) => {
    const itemPath = path.join(folderPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      handleFolder(itemPath, excludingFileName);
      return;
    }

    if (item === excludingFileName) return;

    const fileContent = fs.readFileSync(itemPath, 'utf8');
    if (item.endsWith('.css')) css += `${fileContent}\r\n`;
    if (item.endsWith('.js')) js += `${fileContent}\r\n`;
  });
}

function generateVersion() {
  const updateFile = path.resolve(__dirname, './src/packages/Update/Update.js');
  let version = fs.readFileSync(updateFile, 'utf8');
  version = version.match(/var curVersion = "(.*?)"/)[1];
  fs.writeFileSync(path.resolve(__dirname, './dist/douyuex_version.txt'), version);
}

function treeShakeOnce(code) {
  return uglifyjs.minify(code, {
    toplevel: true,
    compress: {
      toplevel: true,
      unused: true,
      dead_code: true,
      side_effects: false,
      passes: 1,
      collapse_vars: false,
      reduce_vars: false,
      conditionals: false,
      comparisons: false,
      evaluate: false,
      booleans: false,
      typeofs: false,
      loops: false,
      if_return: false,
      inline: false,
      join_vars: false,
      sequences: false,
      properties: false,
      switches: false,
      hoist_props: false,
    },
    mangle: false,
    output: {
      beautify: true,
      comments: false,
    },
  });
}

function treeShake(code) {
  const originalSize = Buffer.byteLength(code);
  console.log(`[Tree Shake] 原始大小: ${originalSize} 字节`);

  let current = code;
  let round = 0;
  while (true) {
    round += 1;
    const result = treeShakeOnce(current);
    if (result.error) {
      console.error(`[Tree Shake] 第 ${round} 轮错误:`, result.error);
      return current;
    }

    const prevSize = Buffer.byteLength(current);
    const newSize = Buffer.byteLength(result.code);
    const diff = prevSize - newSize;
    console.log(`[Tree Shake] 第 ${round} 轮: ${prevSize} -> ${newSize} 字节, 减少 ${diff} 字节`);
    if (diff <= 0) break;
    current = result.code;
  }

  const finalSize = Buffer.byteLength(current);
  const totalSaved = originalSize - finalSize;
  const savedPercent = ((totalSaved / originalSize) * 100).toFixed(1);
  console.log(`[Tree Shake] 完成! 共 ${round} 轮, 减少 ${totalSaved} 字节 (${savedPercent}%)`);
  return current;
}

function extractHeader(code) {
  const endTag = '// ==/UserScript==';
  const idx = code.indexOf(endTag);
  if (idx === -1) return { header: '', body: code };
  const splitPos = idx + endTag.length;
  return {
    header: `${code.substring(0, splitPos)}\r\n`,
    body: code.substring(splitPos),
  };
}

function build() {
  const distDir = path.resolve(__dirname, './dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
  generateVersion();
  handleFolder(path.resolve(__dirname, './src'), 'main.js');
  css = css.replace(/\r\n/g, '');

  const mainFile = path.resolve(__dirname, './src/main.js');
  let template = fs.readFileSync(mainFile, 'utf8');
  template = template.replace('/*编译器标记 勿删*/', css).replace('// 编译器标记 勿删', js);

  const { header, body } = extractHeader(template);
  const shakenBody = treeShake(body);

  fs.writeFileSync(path.resolve(distDir, './douyuex.js'), header + shakenBody);

  const result = uglifyjs.minify(shakenBody, { toplevel: true });
  fs.writeFileSync(path.resolve(distDir, './douyuex.user.js'), header + result.code);
}

build();
