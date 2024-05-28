'use client'

import React, {useState} from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { CreateSubredditPayload } from '@/lib/validators/subreddit'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useCustomToasts } from '@/hooks/use-custom-toast'

const page = () => {
    const [input,setInput]=useState<string>('')
    const router=useRouter()
    const { loginToast } = useCustomToasts()

    const {mutate: createCommunity, isLoading} = useMutation({
        mutationFn: async () => {
            const payload: CreateSubredditPayload = {
                name: input,
            }
            const {data} = await axios.post('/api/subreddit',payload)
            return data as string
        },
        onError: (err) => {
          if(err instanceof AxiosError){
            if(err.response?.status===409){
              return toast({
                title:"Community already exists",
                description:'Please choose a unique and different name',
                variant:'destructive'
              })
            }
            if(err.response?.status===422){
              return toast({
                title:"Invalid Community name",
                description:'Choose a name of length 3 to 21',
                variant:'destructive'
              })
            }
            if(err.response?.status===401){
              return loginToast()
            }
          }
          toast({
            title:'There was an error',
            description:'Could not create the community',
            variant:'destructive'
          })
        },
        onSuccess: (data)=>{
          router.push(`/com/${data}`)
        }
        
    })

  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto'>
      <div className='relative bg-slate-800 w-full h-fit p-4 rounded-lg space-y-6 shadow-2xl'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Community</h1>
        </div>

        <hr className='bg-red-500 h-px' />

        <div>
          <p className='text-lg font-medium'>Name</p>
          <p className='text-xs pb-2'>
            Community names including capitalization cannot be changed.
          </p>
          <div className='relative'>
            <p className='ml-2 mr-2 absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-500'>
              com/  
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='pl-11 text-black'
            />
          </div>
        </div>
        <div className='flex justify-end gap-4'>
        <Button
            onClick={()=>router.back()}
            variant='subtle'
            >
            Cancel
          </Button>
          <Button
            className='bg-zinc-500'
            disabled={input.length === 0}
            isLoading={isLoading}
            onClick={()=>createCommunity()}
            >
            Create Community
          </Button>
        </div>
        </div>
        </div>
    )
}

export default page