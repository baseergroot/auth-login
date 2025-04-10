"use server"

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export default async function GET() {
  const cookieStore = await cookies()

    
  cookieStore.set("token", "");

  return NextResponse.redirect('/')
}
