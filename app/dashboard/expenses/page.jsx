'use client'
import { useEffect, useState } from 'react'
import ExpensesListTable from './_components/ExpenseListTable'
import { Budget, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig';
import { eq, desc } from 'drizzle-orm'

const Expense = () => {
 const [expensesList,setExpensesList] = useState([])
 const { user } = useUser();


  useEffect(() => {
    user && getAllExpenses();
  }, [user]);


     // Used to get all the expenses 
  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budget)
    .rightJoin(Expenses,eq(Budget.id,Expenses.budgetId))
    .where(eq(Budget.createdBy,user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id))
    
    setExpensesList(result)
  }

  return (
      <div className='p-5 w-[80%]'>
          <ExpensesListTable
          expensesList={expensesList}
          refreshData={()=>getBudgetList()}
          />
      </div>
  )
}

export default Expense