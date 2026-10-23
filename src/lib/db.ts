import 'server-only'

import getMongoClient from '@/lib/mongodb'

export async function getDatabase() {
    const client = await getMongoClient()

    const databaseName = process.env.MONGODB_DB;

    if (!databaseName) {
        throw new Error('MONGODB_DB is not configured')
    }

    return client.db(databaseName)
}
