import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import Nav from '../components/Nav'

export default function TechDirectory() {
  const [techs, setTechs] = useState([])
  const [form, setForm] = useState({ techId: '', name: '' })

  useEffect(() => { fetchTechs() }, [])

  const fetchTechs = async () => {
    const { data } = await supabase.from('techs').select('*')
    setTechs(data || [])
  }

  const addTech = async () => {
    await supabase.from('techs').insert([{ ...form }])
    setForm({ techId: '', name: '' })
    fetchTechs()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tech Directory</h1>
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <input placeholder="Tech ID (e.g. ME0145)" value={form.techId} onChange={e => setForm({...form, techId: e.target.value})} className="mb-3 w-full p-2 bg-gray-700 rounded" />
          <input placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="mb-3 w-full p-2 bg-gray-700 rounded" />
          <button onClick={addTech} className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold">Add Tech</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {techs.map(t => (
            <div key={t.id} className="bg-gray-800 p-4 rounded text-center">
              <div className="font-bold">{t.techId}</div>
              <div className="text-sm text-gray-400">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
