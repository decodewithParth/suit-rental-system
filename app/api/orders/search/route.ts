import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ message: "Query parameter is required" }, { status: 400 })
  }

  const results = db.findOrder(query)
  return NextResponse.json(results)
}

