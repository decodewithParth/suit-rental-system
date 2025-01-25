import { hash, compare } from 'bcrypt'

type Order = {
  id: string
  type: "suit" | "shervani"
  number: string
  bookingDate: string
  weddingDate: string
  quantity: number
}

class DB {
  private users: { username: string; passwordHash: string }[] = []
  private orders: Order[] = []

  async createUser(username: string, password: string) {
    const passwordHash = await hash(password, 10)
    this.users.push({ username, passwordHash })
  }

  async validateUser(username: string, password: string) {
    const user = this.users.find((u) => u.username === username)
    if (!user) return false
    return compare(password, user.passwordHash)
  }

  addOrder(order: Order) {
    this.orders.push(order)
  }

  getOrders() {
    return this.orders
  }

  findOrder(query: string) {
    return this.orders.filter((order) => order.number === query || order.weddingDate === query)
  }

  isAvailable(type: "suit" | "shervani", number: string, date: string) {
    return !this.orders.some((order) => order.type === type && order.number === number && order.bookingDate === date)
  }
}

export const db = new DB()

// Create a default user
db.createUser("admin", "password123")

