import 'server-only'

import { getDatabase } from '@/lib/db'

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const database = await getDatabase()
    await database.command({ ping: 1 })
    return true
  } catch (error) {
    console.error('Health check failed', error)
    return false
  }
}
