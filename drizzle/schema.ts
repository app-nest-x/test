import { pgTable, serial, varchar, foreignKey, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const budget = pgTable("budget", {
	id: serial().primaryKey().notNull(),
	name: varchar().notNull(),
	amount: varchar().notNull(),
	icon: varchar(),
	createdBy: varchar().notNull(),
});

export const expenses = pgTable("expenses", {
	id: serial().primaryKey().notNull(),
	name: varchar().notNull(),
	amount: varchar().notNull(),
	budgetId: integer(),
	createdAt: varchar().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.budgetId],
			foreignColumns: [budget.id],
			name: "expenses_budgetId_budget_id_fk"
		}),
]);
