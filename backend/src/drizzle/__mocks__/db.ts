import { mockDeep } from 'vitest-mock-extended'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'


export const db = mockDeep<PostgresJsDatabase>()