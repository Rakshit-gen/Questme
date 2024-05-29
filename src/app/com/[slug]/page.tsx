import { getAuthSession } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import MiniCreatePost from '@/components/MiniCreatePost'
import { FC } from 'react'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import PostFeed from '@/components/PostFeed'
interface pageProps {
    params:{
        slug: string

    }
}

const page = async ({params}: pageProps) => {
    const { slug } = params

    const session = await getAuthSession()
    const subreddit = await db.subreddit.findFirst({
        where: { name: slug },
        include: {
          posts: {
            include: {
              author: true,
              votes: true,
              comments: true,
              subreddit: true,
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: INFINITE_SCROLL_PAGINATION_RESULTS
          },
        },
      })
    
      if (!subreddit) return notFound()
  return (
    <>
    <h1 className='font-bold text-3xl md:text-4xl h-12'>
    com/{subreddit.name}
  </h1>
  <MiniCreatePost session={session} />
  <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
  </>
  )
  
}

export default page