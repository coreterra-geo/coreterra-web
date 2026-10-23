import { checkDatabaseConnection } from '@/api/health/check-database'

export const runtime = 'nodejs'

export async function GET() {
  const success = await checkDatabaseConnection()

  return Response.json(
    { success },
    {
      status: success ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    },
  )
}
