import { integer, numeric, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const Budget = pgTable('budget', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notNull()
})

export const Expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull(), // Store as numeric instead of varchar
    budgetId: integer('budgetId').references(() => Budget.id),
    createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(), // Use proper timestamp
    createdBy:varchar('createdBy').notNull()

})
