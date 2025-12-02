import React, { useState, useEffect } from 'react';
import { ChatArea } from './components/ChatArea';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ModelInfo } from './types';

const App: React.FC = () => {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('qwen-turbo');
  const [conversations] = useState<any[]>([]);
  const [currentConversation, setCurrentConversation] = useState<any>(null);

  // 模拟获取模型列表
  useEffect(() => {
    // 在实际应用中，这里会从API获取模型列表
    const mockModels: ModelInfo[] = [
      { id: 'qwen-turbo', name: 'Qwen Turbo', description: '快速、经济高效的模型' },
      { id: 'qwen-plus', name: 'Qwen Plus', description: '平衡性能和成本' },
      { id: 'qwen-max', name: 'Qwen Max', description: '强大的推理能力' },
      { id: 'qwen-7b', name: 'Qwen 7B', description: '开源7B参数模型' },
    ];
    setModels(mockModels);
    setSelectedModel('qwen-turbo');
  }, []);

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar 
          models={models} 
          selectedModel={selectedModel} 
          onModelChange={setSelectedModel}
          conversations={conversations}
          currentConversation={currentConversation}
          onConversationChange={setCurrentConversation}
        />
        <ChatArea 
          model={selectedModel} 
          models={models}
          onModelChange={setSelectedModel}
        />
      </div>
    </div>
  );
};

export default App;