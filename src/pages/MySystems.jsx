import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import Nav from '../components/Nav'

export default function MySystems() {
  const [systems, setSystems] = useState([])
  const [form, setForm] = useState({ name: '', env: 'PRD', systemId: '', spool: '', release: '758' })

  useEffect(() => { fetchSystems() }, [])

  const fetchSystems = async () => {
    const { data } = await supabase.from('systems').select('*').order('created_at', { ascending: false })
    setSystems(data || [])
  }

  const addSystem = async () => {
    await supabase.from('systems').insert([{ ...form }])
    setForm({ name: '', env: 'PRD', systemId: '', spool: '', release: '758' })
    fetchSystems()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Systems</h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <input placeholder="Client Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="mb-3 w-full p-2 bg-gray-700 rounded" />
          <select value={form.env} onChange={e => setForm({...form, env: e.target.value})} className="mb-3 w-full p-2 bg-gray-700 rounded">
            <option>PRD</option><option>QA</option><option>DEV</option><option>SBX</option>
          </select>
          <input placeholder="System ID (e.g. US4)" value={form.systemId} onChange={e => setForm({...form, systemId: e.target.value})} className="mb-3 w-full p-2 bg-gray-700 rounded" />
          <input placeholder="Spool Server (e.g. vhdiius4ci_US4_00)" value={form.spool} onChange={e => setForm({...form, spool: e.target.value})} className="mb-3 w-full p-2 bg-gray-700 rounded" />
          <input placeholder="Release (e.g. 758)" value={form.release} onChange={e => setForm({...form, release: e.target.value})} className="mb-3 w-full p-2 bg-gray-700 rounded" />
          <button onClick={addSystem} className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold">Add System</button>
        </div>

        <div className="space-y-4">
          {systems.map(sys => (
            <div key={sys.id} className="bg-gray-800 p-4 rounded">
              <strong>{sys.name}</strong> — {sys.env} — {sys.systemId} — {sys.spool}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
