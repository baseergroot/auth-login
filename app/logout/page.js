// In a client component
'use client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout') // triggers the server route
    router.push('/') // redirect to homepage after logout
  }

  return <button onClick={handleLogout}>Logout</button>
}
