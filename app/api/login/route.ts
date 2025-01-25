import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const { username, password } = await request.json()
  const isValid = await db.validateUser(username, password)

  if (isValid) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}

