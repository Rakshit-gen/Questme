import React from 'react'
import Link from 'next/link'
import { Icons } from './icons'
import { buttonVariants } from './ui/Button'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'

const Navbar = async () => {

  const session = await getAuthSession()

  return (
    <>
    
    <div className='fixed top-0 inset-x-0 h-fit bg-slate-700 border-b border-zinc-500 z-[10] py-2'>
        <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
            <Link href='/' className='flex gap-2 items-center'>
                <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
                <p className='hidden text-zinc-100 text-sm font-medium md:block'>qME</p>
            </Link>
        
        {session?.user ?( <UserAccountNav user={session.user} /> ): (<Link href='sign-in' className={buttonVariants()}>Sign In</Link>)}
        </div>
    </div>
    </>
  )
}

export default Navbar