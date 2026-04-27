import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, 'dist');
const viteCli = path.resolve(__dirname, 'node_modules/vite/bin/vite.js');
const viteArtifact = path.resolve(distDir, 'douyuex');
const legacyCompatArtifacts = ['douyuex.user.js', 'douyuex.js'];

function runViteBuild() {
  if (!fs.existsSync(viteCli)) {
    throw new Error('未找到 vite 可执行文件，请先执行 npm install');
  }
  execFileSync(process.execPath, [viteCli, 'build'], {
    cwd: __dirname,
    stdio: 'inherit',
  });
}

function emitLegacyCompatArtifacts() {
  if (!fs.existsSync(viteArtifact)) {
    throw new Error(`Vite 构建产物不存在: ${viteArtifact}`);
  }
  const content = fs.readFileSync(viteArtifact, 'utf8');
  for (const fileName of legacyCompatArtifacts) {
    fs.writeFileSync(path.resolve(distDir, fileName), content);
  }
}

function build() {
  console.warn('[deprecated] build:legacy 已切换为 Vite 统一构建，仅保留兼容产物别名。');
  runViteBuild();
  emitLegacyCompatArtifacts();
}

build();
