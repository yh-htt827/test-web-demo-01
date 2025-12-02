// API模拟文件 - 实际项目中会替换为真实的API调用
export const fetchModels = async (): Promise<any[]> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 'qwen-turbo', name: 'Qwen Turbo', description: '快速、经济高效的模型' },
    { id: 'qwen-plus', name: 'Qwen Plus', description: '平衡性能和成本' },
    { id: 'qwen-max', name: 'Qwen Max', description: '强大的推理能力' },
    { id: 'qwen-7b', name: 'Qwen 7B', description: '开源7B参数模型' },
  ];
};

export const sendMessage = async (message: string, model: string): Promise<string> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模拟AI回复
  return `这是对 "${message}" 的回复。使用模型: ${model}。`;
};