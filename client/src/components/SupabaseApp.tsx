import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from './Auth'
import DataTest from './DataTest'
import LAMTest from './LAMTest'
import { Session } from '@supabase/supabase-js'

export default function SupabaseApp() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) alert(error.message)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {session && session.user ? (
        <div className="space-y-6">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <h3 className="font-bold">Authenticated!</h3>
            <p>User ID: {session.user.id}</p>
            <p>Email: {session.user.email}</p>
            <button
              onClick={() => signOut()}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
          
          <DataTest />
          <LAMTest />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  )
} 