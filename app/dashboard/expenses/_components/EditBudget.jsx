'use client'
import { PenBox } from 'lucide-react'
import {Button} from '../../../../components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budget } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

const EditBudget = ({budgetInfo,refreshData}) => {
  const [emojiIcon,setEmojiIcon]=useState(budgetInfo?.icon)
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  
  const [name,setName]= useState()
  const [amount, setAmount] = useState()
  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon)
      setAmount(budgetInfo.amount)
      setName(budgetInfo.name)
    }
  }, [budgetInfo]);

  const onUpdateBudget =async () => {
    const result = await db.update(Budget).set({
      name: name,
      amount: amount,
      emoji:emojiIcon
    }).where(eq(Budget.id,budgetInfo.id))
    .returning()
    if (result) {
      refreshData()
      toast('Budget updated!')
    }
  }

  return (
      <div>
      <Dialog>
        <DialogTrigger asChild>
                <Button className="flex gap-2"><PenBox />Edit</Button>
        </DialogTrigger>
        <DialogContent className='bg-primary-foreground text-primary'>
          <DialogHeader>
            <DialogTitle> Update Budget</DialogTitle>
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
                    defaultValue={budgetInfo?.name}
                    className='text-primary'
                    placeholder='e.g. Food'
                    onChange={(e) => setName(e.target.value)}
                    
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-primary font-medium my-1'>Budget Amount</h2>
                  <Input
                    defaultValue={budgetInfo?.amount}
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
                  onClick={()=>onUpdateBudget()}
                className='mt-5 w-full'>
                Update Budget
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget