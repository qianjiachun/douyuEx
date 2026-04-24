const fs = require("fs");
const path = require("path");
const uglifyjs = require("uglify-js");

let css = "";
let js = "";

function handleFolder(folderPath, excludingFileName) {
  // 读取文件夹中的所有文件和子文件夹
  fs.readdirSync(folderPath).forEach((item) => {
    const itemPath = path.join(folderPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      handleFolder(itemPath, excludingFileName);
    } else {
      if (item !== excludingFileName) {
        const fileContent = fs.readFileSync(itemPath, "utf8");
        if (item.includes(".css")) css += fileContent + "\r\n";
        if (item.includes(".js")) js += fileContent + "\r\n";
      }
    }
  });
}

function generateVersion() {
  let version = fs.readFileSync("./src/packages/Update/Update.js", "utf8");
  version = version.match(/var curVersion = "(.*?)"/)[1];
  fs.writeFileSync("./dist/douyuex_version.txt", version);
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
    round++;
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
  const endTag = "// ==/UserScript==";
  const idx = code.indexOf(endTag);
  if (idx === -1) return { header: "", body: code };
  const splitPos = idx + endTag.length;
  return {
    header: code.substring(0, splitPos) + "\r\n",
    body: code.substring(splitPos),
  };
}

function build() {
  generateVersion();
  handleFolder("./src", "main.js");
  css = css.replace(/\r\n/g, "");
  let template = fs.readFileSync("./src/main.js", "utf8");
  template = template.replace("/*编译器标记 勿删*/", css).replace("// 编译器标记 勿删", js);

  if (!fs.existsSync("./dist")) fs.mkdirSync("./dist");

  const { header, body } = extractHeader(template);
  const shakenBody = treeShake(body);

  fs.writeFileSync("./dist/douyuex.js", header + shakenBody);

  const result = uglifyjs.minify(shakenBody, { toplevel: true });
  fs.writeFileSync("./dist/douyuex.user.js", header + result.code);
}

build();
