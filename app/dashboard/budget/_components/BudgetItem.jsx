    import Link from 'next/link'
    import React from 'react'

    const BudgetItem = ({ budget }) => {
        
        // to calculate the progress bar ie : remaining amount
        const calculateProgressPerc = () => {
            if (!budget.amount || budget.amount === 0) return 0; // Prevent division by zero
            const perc = (budget.totalSpend / budget.amount) * 100;
            return perc.toFixed(2);
        };


        return (
            <Link href={'/dashboard/expenses/' + budget?.id} >
                <div className='p-5 border 
            rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
                <div className='flex justify-between gap-2 items-center'>
                <div className='flex gap-2 items-center '>
                    <h2 className='text-2xl px-4 bg-primary-foreground p-3 rounded-full '>
                        {budget?.icon}
                    </h2>
                    <div>
                        <h2 className='font-bold'>{budget.name}</h2>
                        <h2 className='text-muted'>{ budget.totalItem} Item</h2>
                    </div>
                        
                </div>
                    <h2 className='font-bold text-primary text-lg'>${budget.amount}</h2>
                </div>
                <div className='mt-5 '>
                    <div className='flex items-center justify-between mb-3 '>
                        <h2 className='text-xs text-muted '>
                            ${budget.totalSpend ? budget.totalSpend : 0} Spent
                        </h2>
                        <h2 className='text-xs text-muted '>
                            ${budget.amount - budget.totalSpend} Remaining
                        </h2>
                    </div>
                    <div className='w-full rounded-full bg-primary-foreground h-2'>
                        <div className='
                        rounded-full bg-primary h-2'
                            style={{
                            width : `${calculateProgressPerc()}%`
                        }}
                        >
                            
                        </div>
                    </div>
                    </div>
                    </div>
            </Link>
        )
    }

    export default BudgetItem