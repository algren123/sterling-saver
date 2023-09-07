import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-valibot'

// User
export const UserTable = sqliteTable('User', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
})

export type User = InferSelectModel<typeof UserTable>
export type InsertUser = InferInsertModel<typeof UserTable>
export const UserSchema = createInsertSchema(UserTable)

// Expenses
export type Expenses = {
  essentials: Essentials | undefined
  bills: Bills | undefined
  subscriptions: Subscriptions | undefined
}

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
export const BillsTable = sqliteTable('Bills', {
  email: text('email').primaryKey(),
  councilTax: integer('councilTax').notNull(),
  electricity: integer('electricity').notNull(),
  gas: integer('gas').notNull(),
  internet: integer('internet').notNull(),
  phone: integer('phone').notNull(),
  water: integer('water').notNull(),
})

export type Bills = InferSelectModel<typeof BillsTable>
export type InsertBills = InferInsertModel<typeof BillsTable>
export const BillsSchema = createInsertSchema(BillsTable)

// Subscriptions
export const SubscriptionsTable = sqliteTable('Subscriptions', {
  email: text('email').primaryKey(),
  amazon: integer('amazon').notNull(),
  apple: integer('apple').notNull(),
  disneyPlus: integer('disneyPlus').notNull(),
  netflix: integer('netflix').notNull(),
  gym: integer('gym').notNull(),
  spotify: integer('spotify').notNull(),
})

export type Subscriptions = InferSelectModel<typeof SubscriptionsTable>
export type InsertSubscriptions = InferInsertModel<typeof SubscriptionsTable>
export const SubscriptionsSchema = createInsertSchema(SubscriptionsTable)

// Income
export const IncomeTable = sqliteTable('Income', {
  email: text('email').primaryKey(),
  salary: integer('salary').notNull(),
  other: integer('other').notNull(),
})

export type Income = InferSelectModel<typeof IncomeTable>
export type InsertIncome = InferInsertModel<typeof IncomeTable>
export const IncomeSchema = createInsertSchema(IncomeTable)

// Savings
export const SavingsTable = sqliteTable('Savings', {
  email: text('email').primaryKey(),
  amount: integer('amount').notNull(),
})

export type Savings = InferSelectModel<typeof SavingsTable>
export type InsertSavings = InferInsertModel<typeof SavingsTable>
export const SavingsSchema = createInsertSchema(SavingsTable)
