import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './supabase/client'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MySystems from './pages/MySystems'
import TechDirectory from './pages/TechDirectory'
import BulkUpload from './pages/BulkUpload'
import SingleWizard from './pages/SingleWizard'
import ExportHistory from './pages/ExportHistory'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return <div className="flex items-center justify-center h-screen text-2xl">Loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={session ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/systems" element={session ? <MySystems /> : <Navigate to="/" />} />
        <Route path="/techs" element={session ? <TechDirectory /> : <Navigate to="/" />} />
        <Route path="/bulk" element={session ? <BulkUpload /> : <Navigate to="/" />} />
        <Route path="/single" element={session ? <SingleWizard /> : <Navigate to="/" />} />
        <Route path="/history" element={session ? <ExportHistory /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
