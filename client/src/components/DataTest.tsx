import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Instrument {
  id: number
  name: string
}

export default function DataTest() {
  const [instruments, setInstruments] = useState<Instrument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInstruments()
  }, [])

  async function getInstruments() {
    try {
      const { data, error } = await supabase
        .from('instruments')
        .select('*')
      
      if (error) {
        console.error('Error fetching instruments:', error)
        alert('Error fetching data: ' + error.message)
      } else {
        setInstruments(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Database Test</h2>
      
      {loading ? (
        <p>Loading instruments...</p>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">Instruments from Supabase:</h3>
          <ul className="space-y-2">
            {instruments.map((instrument) => (
              <li key={instrument.id} className="p-3 bg-gray-100 rounded">
                {instrument.name}
              </li>
            ))}
          </ul>
          
          {instruments.length === 0 && (
            <p className="text-gray-500">No instruments found. Make sure you've created the table in Supabase.</p>
          )}
        </div>
      )}
    </div>
  )
} 