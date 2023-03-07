import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

declare global {
  interface String {
    isEmpty(): boolean
  }
}

String.prototype.isEmpty = function (): boolean {
  return (this.length < 1) ? true : false
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
