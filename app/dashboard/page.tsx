import { Suspense } from "react"
import AddOrderForm from "../components/add-order-form"
import OrderList from "../components/order-list"
import SearchOrders from "../components/search-orders"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Suit Rental Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Add New Order</h2>
          <AddOrderForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Search Orders</h2>
          <SearchOrders />
          <h2 className="text-xl font-semibold my-2">All Orders</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <OrderList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

