import { PiggyBank, Receipt, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardsInfo = ({ budgetList }) => {
    const [totalBudget, setTotalBudget] = useState(0);
   const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        budgetList && CalculateCardInfo()
    },[budgetList])
    const CalculateCardInfo = () => {
        let totalBudget = 0;
        let totalSpend_ = 0;

        budgetList.forEach(element => {
            totalBudget=totalBudget+Number(element.amount)
            totalSpend_=totalSpend_ + element.totalSpend
        })
        setTotalBudget(totalBudget)
        setTotalSpend(totalSpend_)
        console.log(totalBudget,totalSpend_)
    }

    return (
        <div>
            {budgetList?.length >0 ?
                <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    <div className='p-7 border rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm '>Total Budget</h2>
                            <h2 className='font-bold text-2xl'>${totalBudget}</h2>
                        </div>
                        <PiggyBank className='p-3 h-12 w-12 rounded-full text-primary-foreground bg-primary' />
                    </div>
                    <div className='p-7 border rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm '>Total Spent</h2>
                            <h2 className='font-bold text-2xl'>${totalSpend}</h2>
                        </div>
                        <Receipt className='p-3 h-12 w-12 rounded-full text-primary-foreground bg-primary' />
                    </div>
                    <div className='p-7 border rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm '>No. of Budget</h2>
                            <h2 className='font-bold text-2xl'>{budgetList.length}</h2>
                        </div>
                        <Wallet className='p-3 h-12 w-12 rounded-full text-primary-foreground bg-primary' />
                    </div>
                </div>
                :
                <div  className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {[1, 2, 3].map((item, index) => (
                        <div key={index} className='h-[110px] w-full bg-primary-foreground animate-pulse rounded-lg'></div>
                    ))}
                 </div>
            }
               
            </div>
  )
}

export default CardsInfo