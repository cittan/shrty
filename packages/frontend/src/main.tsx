
import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/HomePage'
import './index.css'   // 全局样式
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)