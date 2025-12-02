import React, { useState, useRef, useEffect } from 'react';
import { ModelInfo } from '../types';

interface ChatAreaProps {
  model: string;
  models: ModelInfo[];
  onModelChange: (modelId: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ model, models, onModelChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 模拟初始消息
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: '你好！我是Qwen AI助手，有什么我可以帮你的吗？',
        timestamp: new Date()
      }
    ]);
  }, []);

  // 滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // 模拟API调用
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `这是对 "${inputValue}" 的回复。这是Qwen AI助手的模拟回复。`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedModelInfo = models.find(m => m.id === model);

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="model-info">
          <select 
            value={model} 
            onChange={(e) => onModelChange(e.target.value)}
            className="model-select"
          >
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <span className="model-description">{selectedModelInfo?.description}</span>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-content">
              {msg.content}
            </div>
            <div className="message-timestamp">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入消息..."
          className="message-input"
          rows={1}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={isLoading || !inputValue.trim()}
          className="send-button"
        >
          发送
        </button>
      </div>
    </div>
  );
};