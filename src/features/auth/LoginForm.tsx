import { useState } from 'react'
import { useLoginMutation } from '../../services/authApi'
import { useAppDispatch } from '../../hooks'
import { setCredentials } from './authSlice'

export function LoginForm() {
    const dispatch = useAppDispatch()
    const [login, { isLoading, error }] = useLoginMutation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const result = await login({
                username,
                password,
            }).unwrap()

            dispatch(setCredentials(result))
        } catch {
            // handled by error state
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-xl bg-slate-800 p-4"
        >
            <h2 className="text-xl font-semibold">Login</h2>

            <input
                className="w-full rounded bg-slate-700 p-2"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                className="w-full rounded bg-slate-700 p-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                disabled={isLoading}
                className="w-full rounded bg-blue-600 py-2 disabled:opacity-50"
            >
                {isLoading ? 'Logging in…' : 'Login'}
            </button>

            {error && (
                <p className="text-sm text-red-400">
                    Invalid credentials
                </p>
            )}
        </form>
    )
}
