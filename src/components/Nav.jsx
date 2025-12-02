import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex gap-4 flex-wrap">
        <Link to="/dashboard" className={`px-4 py-2 rounded ${isActive('/dashboard')}`}>Dashboard</Link>
        <Link to="/systems" className={`px-4 py-2 rounded ${isActive('/systems')}`}>My Systems</Link>
        <Link to="/techs" className={`px-4 py-2 rounded ${isActive('/techs')}`}>Tech Directory</Link>
        <Link to="/bulk" className={`px-4 py-2 rounded ${isActive('/bulk')}`}>Bulk Generate</Link>
        <Link to="/single" className={`px-4 py-2 rounded ${isActive('/single')}`}>Single Wizard</Link>
        <Link to="/history" className={`px-4 py-2 rounded ${isActive('/history')}`}>History</Link>
      </div>
    </nav>
  )
}
