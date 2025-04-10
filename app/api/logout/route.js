// app/api/logout/route.js
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  cookieStore.set('token', '', { path: '/', maxAge: 0 })

  return NextResponse.redirect('http://localhost:3000')
}
