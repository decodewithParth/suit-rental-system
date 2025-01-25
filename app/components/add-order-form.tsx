"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddOrderForm() {
  const [type, setType] = useState<"suit" | "shervani">("suit")
  const [number, setNumber] = useState("")
  const [bookingDate, setBookingDate] = useState("")
  const [weddingDate, setWeddingDate] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, number, bookingDate, weddingDate, quantity }),
    })
    if (res.ok) {
      setType("suit")
      setNumber("")
      setBookingDate("")
      setWeddingDate("")
      setQuantity(1)
      setError("")
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="type">Type</Label>
        <Select value={type} onValueChange={(value: "suit" | "shervani") => setType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="suit">Suit</SelectItem>
            <SelectItem value="shervani">Shervani</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="number">Number</Label>
        <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="bookingDate">Booking Date</Label>
        <Input
          id="bookingDate"
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="weddingDate">Wedding Date</Label>
        <Input
          id="weddingDate"
          type="date"
          value={weddingDate}
          onChange={(e) => setWeddingDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Add Order</Button>
    </form>
  )
}

