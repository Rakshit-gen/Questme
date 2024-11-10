import { Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import { getAuthSession } from '@/lib/auth';
import CustomFeed from '@/components/homepage/CustomFeed';
import GeneralFeed from '@/components/homepage/GeneralFeed';
import AnimatedComponent from '@/components/AnimatedComponent'; // Import the animated component

// Fetching subreddits function
async function fetchSubreddits() {
  const baseUrl = 'https://flyuphigh.vercel.app/' || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/subreddits`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch subreddits');
  }
  
  return res.json();
}

export default async function Home() {
  const session = await getAuthSession();
  const subreddits = await fetchSubreddits(); // Fetching the subreddits

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 py-6">
      {/* Sidebar Section for Subreddits */}
      <div className="flex flex-col w-full md:w-1/3 mb-4">
        {/* Subreddit List Section */}
        <AnimatedComponent>
          <div className='overflow-hidden h-fit rounded-lg border border-gray-200 mb-4'>
            <h2 className='bg-blue-600 px-6 py-4 text-white font-semibold'>Subreddits</h2>
            <ul className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
            {subreddits.map((subreddit: any) => (
              <li key={subreddit.id} className='py-3 text-zinc-200'><a href={`/com/${subreddit.name}`}>
                <p className="font-semibold">{subreddit.name}</p>
                <p className="text-gray-300">{subreddit.Creator}</p>
                </a></li>
            ))}
          </ul>
          </div>
        </AnimatedComponent>

        {/* Create Community Section */}
        <AnimatedComponent>
          <div className='overflow-hidden h-fit rounded-lg border border-gray-200'>
            <div className='bg-pink-600 px-6 py-4'>
              <p className='font-semibold py-3 flex items-center gap-1.5'>
                <HomeIcon className='h-4 w-4' />
                Create Community
              </p>
            </div>
            <dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
              <Link
                className={buttonVariants({
                  className: 'w-full mt-4 mb-6 bg-blue-500 hover:bg-blue-600 transition duration-200',
                })}
                href={`/com/create`}>
                Create Community
              </Link>
            </dl>
          </div>
        </AnimatedComponent>
      </div>

      {/* Main Feed Section */}
      <div className="flex-1">
        <h1 className="font-bold font-mono text-3xl md:text-4xl text-yellow-200">Your Feed</h1>
        
        {/* Posts Section */}
        <div className='mt-4'>
          {/* @ts-expect-error server component */}
          {session ? <CustomFeed /> : <GeneralFeed />}
        </div>
      </div>
    </div>
  );
}