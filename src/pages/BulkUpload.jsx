import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { parseExcel } from '../utils/excelParser'
import { generateSapPrinterTxt } from '../utils/sapPrinterGenerator'
import JSZip from 'jszip'
import Nav from '../components/Nav'

export default function BulkUpload() {
  const [file, setFile] = useState(null)
  const [systems, setSystems] = useState([])
  const [techs, setTechs] = useState([])
  const [selectedSystem, setSelectedSystem] = useState('')
  const [selectedTech, setSelectedTech] = useState('')

  useEffect(() => {
    fetchSystems()
    fetchTechs()
  }, [])

  const fetchSystems = async () => {
    const { data } = await supabase.from('systems').select('*')
    setSystems(data || [])
  }

  const fetchTechs = async () => {
    const { data } = await supabase.from('techs').select('*')
    setTechs(data || [])
  }

  const handleFile = (e) => setFile(e.target.files[0])

  const generate = async () => {
    if (!file || !selectedSystem || !selectedTech) return alert('Select file, system and tech')

    const system = systems.find(s => s.id === selectedSystem)
    const tech = techs.find(t => t.id === selectedTech)
    const excelData = await parseExcel(file)
    const files = generateSapPrinterTxt(excelData, {
      systemId: system.systemId,
      release: system.release,
      spoolServer: system.spool
    }, tech.techId)

    const zip = new JSZip()
    files.forEach(f => zip.file(f.filename, f.blob))
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SAP_Printers_${new Date().toISOString().slice(0,10)}.zip`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bulk Generate</h1>
        <input type="file" accept=".xlsx" onChange={handleFile} className="mb-6 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white" />
        
        <select value={selectedSystem} onChange={e => setSelectedSystem(e.target.value)} className="mb-4 w-full p-3 bg-gray-700 rounded">
          <option value="">Select System</option>
          {systems.map(s => <option key={s.id} value={s.id}>{s.name} ({s.env})</option>)}
        </select>

        <select value={selectedTech} onChange={e => setSelectedTech(e.target.value)} className="mb-6 w-full p-3 bg-gray-700 rounded">
          <option value="">Select Tech</option>
          {techs.map(t => <option key={t.id} value={t.id}>{t.techId} - {t.name}</option>)}
        </select>

        <button onClick={generate} className="w-full py-4 bg-green-600 hover:bg-green-700 rounded text-xl font-bold">
          Generate & Download ZIP
        </button>
      </div>
    </div>
  )
}
