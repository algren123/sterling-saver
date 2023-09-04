import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-valibot'

// User
export const UserTable = sqliteTable('User', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
})

export type User = InferSelectModel<typeof UserTable>
export type InsertUser = InferInsertModel<typeof UserTable>
export const UserSchema = createInsertSchema(UserTable)

// Essentials
export const EssentialsTable = sqliteTable('Essentials', {
  email: text('email').primaryKey(),
  entertainment: integer('entertainment').notNull(),
  food: integer('food').notNull(),
  health: integer('health').notNull(),
})

export type Essentials = InferSelectModel<typeof EssentialsTable>
export type InsertEssentials = InferInsertModel<typeof EssentialsTable>
export const EssentialsSchema = createInsertSchema(EssentialsTable)

// Bills
