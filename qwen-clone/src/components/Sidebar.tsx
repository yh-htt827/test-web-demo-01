import React from 'react';
import { ModelInfo } from '../types';

interface SidebarProps {
  models: ModelInfo[];
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  conversations: any[];
  currentConversation: any;
  onConversationChange: (conversation: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  models,
  selectedModel,
  onModelChange,
  conversations,
  currentConversation,
  onConversationChange
}) => {
  return (
    <aside className="sidebar">
      <div className="model-selector">
        <h3>选择模型</h3>
        <div className="model-list">
          {models.map((model) => (
            <div
              key={model.id}
              className={`model-item ${selectedModel === model.id ? 'selected' : ''}`}
              onClick={() => onModelChange(model.id)}
            >
              <div className="model-name">{model.name}</div>
              <div className="model-description">{model.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="conversation-history">
        <h3>对话历史</h3>
        <div className="conversations-list">
          {conversations.length > 0 ? (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${currentConversation?.id === conv.id ? 'active' : ''}`}
                onClick={() => onConversationChange(conv)}
              >
                {conv.title}
              </div>
            ))
          ) : (
            <div className="no-conversations">暂无对话历史</div>
          )}
        </div>
      </div>
      
      <button className="new-chat-btn">+ 新建对话</button>
    </aside>
  );
};