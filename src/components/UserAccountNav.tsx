'use client'

import { User } from 'next-auth';
import {FC} from 'react'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger } from './ui/DropdownMenu';
import UserAvatar from './UserAvatar'
import { Button } from './ui/Button';
import Link from 'next/link'
import {signOut} from 'next-auth/react'

interface UserAccountNavProps {
    user: Pick<User,'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({user}) => {
    return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar className='h-8 w-8' user={{name:user.name || null, image: user.image || null}} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-gray-400' align='end'>
            <div className='flex items-center justify-start gap-2 p-2'>
                <div className='flex flex-col space-y-1 leading-none'>
                    {user.name && <p className="font-medium">{user.name}</p>}
                    {user.email && <p className="w-[200px] truncate text-sm text-zinc-700">{user.email}</p>}
                    

                </div>

            </div>
            <DropdownMenuSeparator className='bg-zinc-800'/>
            <DropdownMenuItem asChild>
                <Link href='/feed'>Feed</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href='/settings'>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-zinc-800' />
            <DropdownMenuItem onSelect={(event)=>{
                event.preventDefault()
                signOut({
                    callbackUrl:`${window.location.origin}/sign-in`
                })
            }} className='cursor-pointor'>
                Sign Out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)
}
export default UserAccountNav;