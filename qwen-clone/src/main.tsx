import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './SSRApp.jsx' // 使用SSR兼容的组件
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)