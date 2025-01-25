import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const { type, number, bookingDate, weddingDate, quantity } = await request.json()

  if (!db.isAvailable(type, number, bookingDate)) {
    return NextResponse.json({ message: "This item is not available for the selected date" }, { status: 400 })
  }

  const order = {
    id: Date.now().toString(),
    type,
    number,
    bookingDate,
    weddingDate,
    quantity,
  }

  db.addOrder(order)
  return NextResponse.json({ success: true })
}

export async function GET() {
  const orders = db.getOrders()
  return NextResponse.json(orders)
}

