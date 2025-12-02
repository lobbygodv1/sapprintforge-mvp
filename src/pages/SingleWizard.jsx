import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { generateSapPrinterTxt } from '../utils/sapPrinterGenerator'
import Nav from '../components/Nav'

export default function SingleWizard() {
  const [systems, setSystems] = useState([])
  const [techs, setTechs] = useState([])
  const [form, setForm] = useState({ systemId: '', techId: '', longName: '', shortName: '', model: '', location: '', ip: '', winName: '' })

  useEffect(() => {
    supabase.from('systems').select('*').then(d => setSystems(d.data || []))
    supabase.from('techs').select('*').then(d => setTechs(d.data || []))
  }, [])

  const generateSingle = () => {
    const system = systems.find(s => s.id === form.systemId)
    const tech = techs.find(t => t.id === form.techId)
    const fakeExcel = [[], ['Manufacturer','Model','Location','Windows Printer Name','Print Server Name','SAP Short Name','SAP Long Name'], ['Sharp', form.model, form.location, form.winName, form.ip, form.shortName, form.longName]]
    
    const files = generateSapPrinterTxt(fakeExcel, {
      systemId: system.systemId,
      release: system.release,
      spoolServer: system.spool
    }, tech.techId)

    const blob = files[0].blob
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = files[0].filename
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Single Printer Wizard</h1>
        <div className="bg-gray-800 p-6 rounded-lg space-y-4">
          <select onChange={e => setForm({...form, systemId: e.target.value})} className="w-full p-3 bg-gray-700 rounded">
            <option>Select System</option>
            {systems.map(s => <option key={s.id} value={s.id}>{s.name} ({s.env})</option>)}
          </select>
          <select onChange={e => setForm({...form, techId: e.target.value})} className="w-full p-3 bg-gray-700 rounded">
            <option>Select Tech</option>
            {techs.map(t => <option key={t.id} value={t.id}>{t.techId} - {t.name}</option>)}
          </select>
          <input placeholder="SAP Long Name" onChange={e => setForm({...form, longName: e.target.value})} className="w-full p-3 bg-gray-700 rounded" />
          <input placeholder="SAP Short Name (max 4)" onChange={e => setForm({...form, shortName: e.target.value})} className="w-full p-3 bg-gray-700 rounded" />
          <input placeholder="Model (e.g. MX-3051)" onChange={e => setForm({...form, model: e.target.value})} className="w-full p-3 bg-gray-700 rounded" />
          <input placeholder="Location" onChange={e => setForm({...form, location: e.target.value})} className="w-full p-3 bg-gray-700 rounded" />
          <input placeholder="Print Server IP" onChange={e => setForm({...form, ip: e.target.value})} className="w-full p-3 bg-gray-700 rounded" />
          <input placeholder="Windows Printer Name" onChange={e => setForm({...form, winName: e.target.value})} className="w-full p-3 bg-gray-700 rounded" />
          <button onClick={generateSingle} className="w-full py-4 bg-green-600 hover:bg-green-700 rounded text-xl font-bold">
            Generate & Download .txt
          </button>
        </div>
      </div>
    </div>
  )
}
