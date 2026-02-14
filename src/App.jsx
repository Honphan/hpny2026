import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WishDetail from './pages/WishDetail'
import Dashboard from './pages/Admin/Dashboard'
import AddWish from './pages/Admin/AddWish'
import InboxPage from './pages/Admin/Inbox'
import MusicToggle from './components/common/MusicToggle'

export default function App() {
  return (
    <>
      <MusicToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wish/:username" element={<WishDetail />} />
        <Route path="/admin-tet-2026" element={<Dashboard />} />
        <Route path="/admin-tet-2026/add" element={<AddWish />} />
        <Route path="/admin-tet-2026/inbox" element={<InboxPage />} />
      </Routes>
    </>
  )
}

