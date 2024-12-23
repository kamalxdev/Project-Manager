import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"


export const StatusEnum =pgEnum("taskStatus",["PENDING","COMPLETED"])

export const TaskTable = pgTable("task",{
    id:uuid("id").primaryKey().defaultRandom(),
    title : varchar("title").notNull(),
    description:varchar("description").notNull(),
    status:StatusEnum("status").default("PENDING").notNull(), 
    createdAt:timestamp("createdAt").defaultNow().notNull(),
    completedAt:timestamp("completedAt").defaultNow()
})
