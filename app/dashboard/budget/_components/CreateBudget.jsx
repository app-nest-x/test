'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budget } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { DialogClose } from '@radix-ui/react-dialog'

const CreateBudget = ({refreshData}) => {

  const [emojiIcon,setEmojiIcon]=useState('💸')
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  
  const [name,setName]= useState()
  const [amount,setAmount]=useState()

  const {user} =useUser()

  // To create new budget
  const onCreateBudget = async () => {
    const result = await db.insert(Budget)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon:emojiIcon
    }).returning({insertedId:Budget.id})

    if (result) {
      refreshData()
      toast('New Budget Created!')
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className='bg-primary rounded-lg p-10 items-center
            flex text-primary-foreground flex-col bottom-2 cursor-pointer hover:shadow-md border border-border'>
              <h2 className='text-3xl'>
                +
              </h2>
              <h2>
                Create New Budget 
              </h2>
         </div>
        </DialogTrigger>
        <DialogContent className='bg-primary-foreground text-primary'>
          <DialogHeader>
            <DialogTitle> Create New Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button variant='outline' className='text-lg hover:bg-primary' 
                onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
                >{emojiIcon}
                </Button>
                <div className='absolute z-10'>
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji)
                      setOpenEmojiPicker(false)
                    }}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-primary font-medium my-1'>Budget Name</h2>
                  <Input
                    className='text-primary'
                    placeholder='e.g. Food'
                    onChange={(e) => setName(e.target.value)}
                    
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-primary font-medium my-1'>Budget Amount</h2>
                  <Input
                    className='text-primary'
                    placeholder='e.g. $500'
                    onChange={(e)=>setAmount(e.target.value)}
                    type='number'
                  />
                </div>
                
              </div>

            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
                  disabled={!(name && amount)}
                  onClick={()=>onCreateBudget()}
                className='mt-5 w-full'>
                Create Budget
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateBudget