'use client';

import { FC, useState } from 'react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import {signIn} from 'next-auth/react'
import { Icons } from './icons';
import { useToast } from '@/hooks/use-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({className,...props})=>{
    const [loading, setIsLoading] = useState<boolean>(false)
    const {toast} = useToast()
    const loginwithGoogle =async () => {
        setIsLoading(true);
    try {
        
        await signIn('google')
    }
    catch (error){
        // toast notif
        toast({
            title:'There was a problem',
            description:'Error logging in with google',
            variant:'destructive',
        })
    } finally{
        setIsLoading(false)
    }
    }

    return (
        <div className={cn('flex justify-center',className)} >
          <Button onClick={loginwithGoogle} isLoading={loading} size='sm' className='w-full'>
            {loading ? null : <Icons.google className='h-4 w-4 mr-2' />}
            Google
          </Button>
        </div>
      )
}
export default UserAuthForm;