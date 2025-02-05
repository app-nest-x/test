"use client"
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '../../utils/dbConfig'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { eq } from 'drizzle-orm'
import { Budget } from '../../utils/schema'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'

function DashboardLayout  ({ children }) {
    
    const { user } = useUser()
    const router = usePathname()
    
    useEffect(() => {
        user&&checkUserBudgets()
    },[user])

    const checkUserBudgets = async () => {
        const result = await db.select()
        .from(Budget)
        .where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress))
        if (result?.length == 0) {
            router.replace('/dashboard/budget')
        }
    }

    return (
        <div>
            <div className='fixed bg-primary-foreground dark:bg-black md:w-64 hidden md:block'>
                <SideNav/>
            </div >

            <div className='md:ml-64 '>
                <DashboardHeader/>
                {children}
            </div>
        </div >
     
  )
}

export default DashboardLayout