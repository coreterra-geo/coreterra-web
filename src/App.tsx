import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NewsDetail from './pages/NewsDetail'
import BlogPage from './pages/BlogPage'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/news" element={<BlogPage />} />
      <Route path="/news/:slug" element={<NewsDetail />} />
    </Routes>
  </BrowserRouter>
}

export default App
