'use client'
import { db } from "@/utils/dbConfig"
import { Budget, Expenses } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { sql, getTableColumns, eq, desc } from 'drizzle-orm'
import { useEffect, useState } from "react"
import BudgetItem from "../../budget/_components/BudgetItem"
import AddExpense from '../_components/AddExpense'
import ExpenseListTable from "../_components/ExpenseListTable"
import { Button } from "@/components/ui/button"
import { ArrowBigLeft, ArrowLeft, PenBox, Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import EditBudget from "../_components/EditBudget"

const ExpensesScreen = ({ params: paramsPromise }) => {
  const [budgetInfo, setBudgetInfo] = useState(null)
  const [expensesList, setExpensesList] = useState([])
  const [id, setId] = useState(null) // State to store the resolved `id`
  const { user } = useUser()
  const route = useRouter()
   const handleRouteChange = () => {
    route.replace('/dashboard/budget')
  }
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await paramsPromise // Await the promise
      setId(resolvedParams.id) // Set the resolved `id`
    }
    resolveParams()
  }, [paramsPromise])

  useEffect(() => {
    if (user && id) {
      getBudgetInfo()
    }
  }, [id, user])

  const getBudgetInfo = async () => {
    const result = await db.select({
      ...getTableColumns(Budget),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    }).from(Budget)
      .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId))
      .where(eq(Budget.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budget.id, id))
      .groupBy(Budget.id)

    setBudgetInfo(result[0])
    getExpenseList()
  }

  const getExpenseList = async () => {
    const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, id))
      .orderBy(desc(Expenses.id))
    setExpensesList(result)
  }
  const deleteBudget = async () => {
  const deleteExpenseResult = await db.delete(Expenses)
    .where(eq(Expenses.budgetId, id)) // Use 'id' instead of 'params.id'
    .returning()
  
  if (deleteExpenseResult) {
    await db.delete(Budget)
      .where(eq(Budget.id, id)) // Use 'id' instead of 'params.id'
      .returning()
  }
  
  toast('Budget Deleted!')
  route.replace('/dashboard/budget')
}
  
  return (
    <div className="p-10">
      
      <h2 className="text-2xl items-center  flex justify-between font-bold text-primary">
        <div className="flex justify-center items-center gap-4">
          <ArrowLeft
            className="cursor-pointer"
          onClick={   handleRouteChange}
          />
        My Expenses
        </div>
        
        <div className="flex gap-2 items-center">
          <EditBudget
            refreshData={()=>getBudgetInfo()}
            budgetInfo={budgetInfo}
          />
          <AlertDialog>
          <AlertDialogTrigger asChild>
                    <Button className="flex gap-2" variant="destructive"><Trash /> Delete</Button>

          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-primary">
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
        

        </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-primary-foreground rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={id} user={user}
          refreshData={()=>getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable expensesList={expensesList}
          refreshData={()=>getBudgetInfo()}
        />
      </div>
    </div>
  )
}

export default ExpensesScreen
