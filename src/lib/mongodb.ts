import 'server-only'

import { MongoClient, ServerApiVersion } from 'mongodb'

type MongoGlobal = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>
}

const globalForMongo = globalThis as MongoGlobal
let clientPromise: Promise<MongoClient> | undefined

export default function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }

  const cachedPromise = process.env.NODE_ENV === 'development'
    ? globalForMongo._mongoClientPromise
    : clientPromise

  if (cachedPromise) return cachedPromise

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  })
  const connectionPromise = client.connect()

  if (process.env.NODE_ENV === 'development') {
    globalForMongo._mongoClientPromise = connectionPromise
  } else {
    clientPromise = connectionPromise
  }

  void connectionPromise.catch(() => {
    if (process.env.NODE_ENV === 'development') {
      if (globalForMongo._mongoClientPromise === connectionPromise) {
        delete globalForMongo._mongoClientPromise
      }
    } else if (clientPromise === connectionPromise) {
      clientPromise = undefined
    }

    void client.close()
  })

  return connectionPromise
}
