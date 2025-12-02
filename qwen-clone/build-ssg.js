// 简单的SSG构建脚本，用于预渲染首页
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取构建后的index.html作为模板
const templatePath = join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(templatePath)) {
  console.log('请先运行 npm run build 构建项目');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

// 替换动态内容为静态内容
// 这里可以插入预渲染的初始内容
const staticContent = template
  .replace('<div id="root"></div>', `
    <div id="root">
      <div class="app-container">
        <header class="header">
          <div class="header-content">
            <div class="logo">
              <h1>Qwen AI</h1>
            </div>
            <div class="header-actions">
              <button class="btn btn-secondary">登录</button>
              <button class="btn btn-primary">注册</button>
            </div>
          </div>
        </header>
        <div class="main-content">
          <aside class="sidebar">
            <div class="model-selector">
              <h3>选择模型</h3>
              <div class="model-list">
                <div class="model-item selected">
                  <div class="model-name">Qwen Turbo</div>
                  <div class="model-description">快速、经济高效的模型</div>
                </div>
                <div class="model-item">
                  <div class="model-name">Qwen Plus</div>
                  <div class="model-description">平衡性能和成本</div>
                </div>
                <div class="model-item">
                  <div class="model-name">Qwen Max</div>
                  <div class="model-description">强大的推理能力</div>
                </div>
                <div class="model-item">
                  <div class="model-name">Qwen 7B</div>
                  <div class="model-description">开源7B参数模型</div>
                </div>
              </div>
            </div>
            <div class="conversation-history">
              <h3>对话历史</h3>
              <div class="conversations-list">
                <div class="no-conversations">暂无对话历史</div>
              </div>
            </div>
            <button class="new-chat-btn">+ 新建对话</button>
          </aside>
          <div class="chat-area">
            <div class="chat-header">
              <div class="model-info">
                <select class="model-select">
                  <option value="qwen-turbo">Qwen Turbo</option>
                  <option value="qwen-plus">Qwen Plus</option>
                  <option value="qwen-max">Qwen Max</option>
                  <option value="qwen-7b">Qwen 7B</option>
                </select>
                <span class="model-description">快速、经济高效的模型</span>
              </div>
            </div>
            <div class="messages-container">
              <div class="message assistant-message">
                <div class="message-content">
                  你好！我是Qwen AI助手，有什么我可以帮你的吗？
                </div>
                <div class="message-timestamp">10:30</div>
              </div>
            </div>
            <div class="input-container">
              <textarea placeholder="输入消息..." class="message-input" rows="1"></textarea>
              <button class="send-button">发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);

// 写入预渲染的首页
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), staticContent);
console.log('SSG构建完成：静态首页已生成');