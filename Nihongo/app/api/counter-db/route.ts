// Alternative implementation using Vercel KV (Redis)
// Uncomment and use this if you want a real persistent counter

/*
import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

const COUNTER_KEY = 'nihongo-visit-counter'

export async function GET() {
  try {
    const count = await kv.get<number>(COUNTER_KEY) || 1247
    return NextResponse.json({ count, success: true })
  } catch (error) {
    console.error('Error getting counter from KV:', error)
    return NextResponse.json({ count: 1247, success: false }, { status: 500 })
  }
}

export async function POST() {
  try {
    const count = await kv.incr(COUNTER_KEY)
    return NextResponse.json({ count, success: true })
  } catch (error) {
    console.error('Error incrementing counter in KV:', error)
    const fallbackCount = await kv.get<number>(COUNTER_KEY) || 1247
    return NextResponse.json({ count: fallbackCount, success: false }, { status: 500 })
  }
}
*/
