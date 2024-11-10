import { Home as HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/Button'
import { getAuthSession } from '@/lib/auth'
import CustomFeed from '@/components/homepage/CustomFeed'
import GeneralFeed from '@/components/homepage/GeneralFeed'
import { motion } from 'framer-motion'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-screen-xl mx-auto p-6">
        <motion.h1
          className="font-bold font-mono text-3xl md:text-4xl text-yellow-200 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Your Feed
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6">
          {/* Feed Section with Animation */}
          <motion.div
            className="col-span-2 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* @ts-expect-error server component */}
            {session ? <CustomFeed /> : <GeneralFeed />}
          </motion.div>

          {/* Side Panel for Community Creation */}
          <motion.div
            className="overflow-hidden h-fit rounded-lg border border-gray-200 md:order-last"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
          >
            <div className="bg-pink-600 px-6 py-4 rounded-t-lg shadow-lg">
              <p className="font-semibold py-3 flex items-center gap-1.5 text-white">
                <HomeIcon className="h-4 w-4" />
                Home
              </p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 text-gray-800">
              <div className="flex justify-between gap-x-4 py-3">
                <p className="text-zinc-500">
                  Your personal Breadit frontpage. Create your own communities and share them.
                </p>
              </div>

              <Link
                className={buttonVariants({
                  className: 'w-full mt-4 mb-6 py-2 px-4 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300',
                })}
                href={`/com/create`}
              >
                Create Community
              </Link>
            </dl>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
