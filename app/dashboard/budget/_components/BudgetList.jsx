'use client'
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { Budget, Expenses } from '@/utils/schema'
import { sql,getTableColumns,eq, desc } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import  BudgetItem  from './BudgetItem'


const BudgetList = () => {

  const [budgetList,setBudgetList] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  // TO get budget list
  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budget),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    }).from(Budget)
      .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId ))
      .where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budget.id)
    .orderBy(desc(Budget.id));
    setBudgetList(result);
    console.log(result)
  }

  return (
    <div className='mt-9'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <  CreateBudget
        refreshData={()=>getBudgetList()}
        />
        {budgetList?.length>0? budgetList.map((budget, index) => (
          <BudgetItem key={budget.id} budget={ budget} />
        ))
          : [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='w-full bg-primary-foreground rounded-lg h-[147px] animate-pulse'>
              
        </div>
      ))
      }
      </div>
     
    </div>
  )
}

export default BudgetList