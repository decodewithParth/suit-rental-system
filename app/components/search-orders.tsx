"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SearchOrders() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<
    Array<{
      id: string
      type: "suit" | "shervani"
      number: string
      bookingDate: string
      weddingDate: string
      quantity: number
    }>
  >([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/orders/search?q=${query}`)
    if (res.ok) {
      const data = await res.json()
      setResults(data)
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <Label htmlFor="search">Search by Suit/Shervani Number or Wedding Date</Label>
        <div className="flex mt-1">
          <Input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter number or date"
            className="mr-2"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Number</th>
                <th className="px-4 py-2">Booking Date</th>
                <th className="px-4 py-2">Wedding Date</th>
                <th className="px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {results.map((order) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.type}</td>
                  <td className="border px-4 py-2">{order.number}</td>
                  <td className="border px-4 py-2">{order.bookingDate}</td>
                  <td className="border px-4 py-2">{order.weddingDate}</td>
                  <td className="border px-4 py-2">{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

