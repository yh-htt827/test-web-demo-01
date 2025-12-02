import React, { useState, useEffect } from 'react';

// 服务端渲染兼容的App组件
export const SSRApp = ({ initialMessages = [], initialModels = [], initialMode = 'chat', initialModel = 'Qwen-Max' }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [selectedMode, setSelectedMode] = useState(initialMode);
  const [models, setModels] = useState(initialModels);
  const [isLoading, setIsLoading] = useState(false);

  // 如果在浏览器环境中，获取模型列表
  useEffect(() => {
    if (typeof window !== 'undefined' && models.length === 0) {
      const fetchModels = async () => {
        try {
          // 实际项目中这里会调用API获取模型列表
          const mockModels = ['Qwen-Max', 'Qwen-Plus', 'Qwen-Turbo'];
          setModels(mockModels);
        } catch (error) {
          console.error('获取模型列表失败:', error);
        }
      };
      fetchModels();
    }
  }, [models.length]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // 模拟API调用
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: `这是对"${inputValue}"的回复。`,
          sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('发送消息失败:', error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="mode-selector">
          <button 
            className={`mode-btn ${selectedMode === 'chat' ? 'active' : ''}`}
            onClick={() => setSelectedMode('chat')}
          >
            聊天
          </button>
          <button 
            className={`mode-btn ${selectedMode === 'agent' ? 'active' : ''}`}
            onClick={() => setSelectedMode('agent')}
          >
            智能Agent
          </button>
        </div>
        <select 
          className="model-selector"
          value={selectedModel} 
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.length > 0 ? models.map(model => (
            <option key={model} value={model}>{model}</option>
          )) : (
            <>
              <option>Qwen-Max</option>
              <option>Qwen-Plus</option>
              <option>Qwen-Turbo</option>
            </>
          )}
        </select>
        <div style={{ flex: 1 }}></div>
        <div style={{ padding: '10px', fontSize: '12px', color: '#888' }}>
          通义千问AI © 2025
        </div>
      </div>
      <div className="main-content">
        <div className="chat-container">
          <div className="message-list">
            {messages.length === 0 ? (
              <div className="message bot-message">
                <div className="message-header">AI助手</div>
                <div className="message-content">你好！我是通义千问AI助手，有什么可以帮助你的吗？</div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}-message`}>
                  <div className="message-header">{msg.sender === 'user' ? '你' : 'AI助手'}</div>
                  <div className="message-content">{msg.text}</div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-header">AI助手</div>
                <div className="typing-indicator">AI正在输入...</div>
              </div>
            )}
          </div>
        </div>
        <div className="input-container">
          <textarea
            className="input-box"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
          />
          <button className="send-button" onClick={handleSend}>
            发送
          </button>
        </div>
      </div>
    </div>
  );
};

// 仅在浏览器中使用的App组件包装器
export const App = () => {
  return <SSRApp />;
};