import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import {Inter} from "next/font/google"
import Head from 'next/head'

export const metadata = {
  title: 'qME',
  description: 'A Question board built with Next.js and TypeScript for Developers to communicate.',
}

const inter = Inter({ subsets:['latin'] })

export default function RootLayout({
  children,
  authModal
}: {
  children: React.ReactNode
  authModal:React.ReactNode
}) {
  return (
    <html lang='en' className={cn('bg-gray-800 text-slate-100 antialiased',inter.className)}>
      
      <body className='min-h-screen pt-12 bg-slate-800 antialiased text-slate-100'>
        <Providers>
        {/* @ts-expect-error Server Component */}
        <Navbar />

          <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
          </div>
          </Providers>
        <Toaster />
      </body>
    </html>
  )
}
