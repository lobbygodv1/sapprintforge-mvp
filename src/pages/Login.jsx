import { supabase } from '../supabase/client'

export default function Login() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-10 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-8">SAP PrintForge™</h1>
        <button
          onClick={signInWithGoogle}
          className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
