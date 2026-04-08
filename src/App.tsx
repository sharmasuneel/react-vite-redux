import { LoginForm } from './features/auth/LoginForm'
import { useAppSelector } from './hooks'

export default function App() {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  )

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      {isAuthenticated ? (
        <p>You are logged in ✅</p>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}
