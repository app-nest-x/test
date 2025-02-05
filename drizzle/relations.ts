import { relations } from "drizzle-orm/relations";
import { budget, expenses } from "./schema";

export const expensesRelations = relations(expenses, ({one}) => ({
	budget: one(budget, {
		fields: [expenses.budgetId],
		references: [budget.id]
	}),
}));

export const budgetRelations = relations(budget, ({many}) => ({
	expenses: many(expenses),
}));