import React from 'react'
import { Icons } from './icons'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'
import { cn } from '@/lib/utils'

const SignIn = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
        <div className='flex flex-col space-y-2 text-center'> 
            <Icons.logo className='mx-auto h-6 w-6' />
            <h1 className='text-2xl font-semibold tracking-tight'>Welcome Back</h1>
            <p className='text-sm max-w-xs mx-auto'>
                By continuing, you are setting up a qNITH account and agree to our
                User Agreement and Privacy Policy.
            </p>
            <UserAuthForm />
            <p className='mt-3 px-8 text-center text-sm text-zinc-200'>
                Does not have an account yet? {' '}
                <Link href='/sign-up' className='hover:text-zinc-400 text-sm underline underline-offset-4'>Sign Up</Link>
            </p>
        </div>
    </div>
  )
}

export default SignIn