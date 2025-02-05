import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import {db} from '../../../../utils/dbConfig'
import {  Expenses } from '../../../../utils/schema'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

const AddExpense = ({ budgetId, user,refreshData }) => { 

  const [name,setName]= useState()
  const [amount, setAmount] = useState()
  const [loading,setLoading]=useState(false )

    const addNewExpense = async () => {
   setLoading(true)

    const result = await db.insert(Expenses).values({
        name: name,
        amount: amount,
        budgetId: parseInt(budgetId, 10), // Ensure it's a proper integer
        createdAt: new Date(), // Directly pass Date object
        createdBy:user?.primaryEmailAddress?.emailAddress,
    }).returning({ insertedId: Expenses.id });
    setAmount('')
    setName('')
      if (result) {
    setLoading(false)
    refreshData();
    toast('New Expense Added!');
      } 
      setLoading(false)
};



    
  return (
      <div className='border p-5 rounded-lg'>
          <h2 className='font-bold text-lg'>Add Expense</h2>
          <div className='mt-2'>
                  <h2 className='text-primary font-medium my-1'>Expense Name</h2>
                  <Input
                    className='text-primary'
                    placeholder='e.g. Pet'
                      value={name}
                    onChange={(e) => setName(e.target.value)}
                  
                  />
          </div>
          <div className='mt-2'>
                  <h2 className='text-primary font-medium my-1'>Expense Amount</h2>
                  <Input
                    className='text-primary'
                    placeholder='e.g. 1000'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    
                  />
          </div>
          <Button
              onClick={()=>addNewExpense()}
              disabled={!(name && amount)|| loading} className='mt-3 w-full'
      >
        {loading ?
          <Loader className='animate-spin' /> :  
           "Add New Expense"
      }
             
          </Button>
    </div>
  )
}

export default AddExpense