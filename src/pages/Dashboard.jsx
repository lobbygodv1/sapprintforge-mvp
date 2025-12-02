import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

export default function Dashboard() {
  const signOut = () => supabase.auth.signOut()

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={signOut} className="px-4 py-2 bg-red-600 rounded">Logout</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/systems" className="p-8 bg-gray-800 rounded-lg text-center hover:bg-gray-700">
          <h2 className="text-2xl font-semibold">My Systems</h2>
          <p className="text-gray-400 mt-2">Manage SAP environments</p>
        </Link>
        <Link to="/techs" className="p-8 bg-gray-800 rounded-lg text-center hover:bg-gray-700">
          <h2 className="text-2xl font-semibold">Tech Directory</h2>
          <p className="text-gray-400 mt-2">Manage change technicians</p>
        </Link>
        <Link to="/bulk" className="p-8 bg-gray-800 rounded-lg text-center hover:bg-gray-700">
          <h2 className="text-2xl font-semibold">Bulk Generate</h2>
          <p className="text-gray-400 mt-2">Upload Excel → Get .txt files</p>
        </Link>
      </div>
    </div>
  )
}
