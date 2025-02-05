import { Trash } from 'lucide-react'
import React from 'react'
import { db } from '../../../../utils/dbConfig'
import { Expenses } from '../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

const ExpenseListTable = ({ expensesList,refreshData }) => {
    const deleteExpense = async(expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();
        
        if (result) {
            toast('Expense Deleted!')
            refreshData()
        }
    }
  return (
    <div className='mt-3'>
              <h2 className="font-bold text-lg">Latest Expenses</h2>

      <div className='grid font-bold mt-3 grid-cols-4 text-primary-foreground bg-primary p-2'>
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>
      {expensesList.map((expenses) => (
        <div key={expenses.id} className=' grid grid-cols-4 bg-primary-foreground dark:bg-black p-2'>
          <h2 >{expenses.name}</h2>
          <h2>{expenses.amount}</h2>
          <h2>{new Date(expenses.createdAt).toLocaleDateString()}</h2> 
          <h2 className='px-3'>
                  <Trash className='text-accent cursor-pointer'
                  onClick={()=>deleteExpense(expenses)}                  
                  />
          </h2>
        </div>
      ))}
    </div>
  )
}

export default ExpenseListTable
