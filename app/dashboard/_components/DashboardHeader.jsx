import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
  return (
      <div className='p-5 flex justify-between shadow-sm border-b'>
          <div>
             <h2 className='text-lg'>Master Your Finances with Ease. Take Control Today!</h2> 
          </div>
          <div>
              <UserButton/>
          </div>
    </div>
  )
}

export default DashboardHeader