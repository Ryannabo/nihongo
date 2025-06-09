import { NextResponse } from "next/server"

// In a real app, you'd use a database like Supabase, Firebase, or Vercel KV
// For this example, we'll use a simple in-memory counter with persistence simulation
let visitCount = 1247 // Starting count

// Simulate reading from persistent storage
function getStoredCount(): number {
  // In production, this would read from your database
  // For demo purposes, we'll use a simple increment
  return visitCount
}

// Simulate writing to persistent storage
function setStoredCount(count: number): void {
  // In production, this would write to your database
  visitCount = count
}

export async function GET() {
  try {
    const count = getStoredCount()
    return NextResponse.json({ count, success: true })
  } catch (error) {
    console.error("Error getting counter:", error)
    return NextResponse.json({ count: 1247, success: false }, { status: 500 })
  }
}

export async function POST() {
  try {
    const currentCount = getStoredCount()
    const newCount = currentCount + 1
    setStoredCount(newCount)

    return NextResponse.json({ count: newCount, success: true })
  } catch (error) {
    console.error("Error incrementing counter:", error)
    return NextResponse.json({ count: getStoredCount(), success: false }, { status: 500 })
  }
}
