// 简单的SSG构建脚本，用于预渲染首页
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { renderApp } from './dist-ssr/ssr.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取构建后的index.html作为模板
const templatePath = join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(templatePath)) {
  console.log('请先运行 npm run build 构建项目');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

// 使用React服务器端渲染生成静态内容
const staticContent = template.replace('<div id="root"></div>', renderApp());

// 写入预渲染的首页
fs.writeFileSync(join(__dirname, 'dist', 'index.html'), staticContent);
console.log('SSG构建完成：静态首页已生成');