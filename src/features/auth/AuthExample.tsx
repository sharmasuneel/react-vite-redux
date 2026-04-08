import { useAppDispatch, useAppSelector } from '../../hooks'
import { logout } from './authSlice'

export function AuthExample() {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  )

  if (!isAuthenticated) return null

  return (
    <div className="space-x-4">
      <span>Hello, {user?.name}</span>
      <button
        className="rounded bg-red-600 px-3 py-1"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  )
}