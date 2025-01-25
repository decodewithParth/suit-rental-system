import { db } from "@/lib/db"

export default function OrderList() {
  const orders = db.getOrders()

  return (
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
          {orders.map((order) => (
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
  )
}

