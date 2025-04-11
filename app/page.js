import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export default async function HomePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  let isLoggedIn = false

  if (token) {
    try {
      jwt.verify(token, 'shhhhh') // use your secret
      isLoggedIn = true
    } catch (e) {
      isLoggedIn = false
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
        <h1>✅ You are logged in!</h1>
        <a href="/logout">Logout</a>
        </>
      ) : (
        <div>
          <a href="/signup">Signup</a> | <a href="/login">Login</a>
        </div>
      )}
    </div>
  )
}
