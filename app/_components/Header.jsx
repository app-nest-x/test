'use client'

import React from 'react'
import { useUser, UserButton } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'


const Header = () => {

  const {user,isSignedIn}=useUser()

  return (
      <div className='p-5 flex  bg-primary-foreground justify-between shadow-[4px_8px_6px_0px_rgba(0,_0,_0,_0.1)]'>
      <div className='-ml-40'>
          <Image
              src={'./logo.svg'}
              height={400}
              width={500}
              alt='logo'
             
          />
      </div>   
      {isSignedIn ? <UserButton /> :
        <Link href={'/sign-in'}>
        <button
        type="button" className="text-white bg-primary hover:bg-primary focus:ring-4
         focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
          Get Started
          </button>
        </Link>
      }
      
    </div>
  )
}

export default Header