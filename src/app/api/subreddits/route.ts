// src/app/api/subreddits/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function GET() {
  try {
    const subreddits = await db.subreddit.findMany();
    return NextResponse.json(subreddits);
  } catch (error) {
    return NextResponse.error();
  }
}