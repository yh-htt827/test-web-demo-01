import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Qwen AI</h1>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">登录</button>
          <button className="btn btn-primary">注册</button>
        </div>
      </div>
    </header>
  );
};