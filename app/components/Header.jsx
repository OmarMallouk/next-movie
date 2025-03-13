import React from 'react'
import Link from 'next/link'
import { SignedIn, SignUp, SignInButton, UserButton, SignedOut } from '@clerk/nextjs'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
      <ul className='flex gap-4'>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <SignedOut>
      <Link href={`/sign-in`}>Sign In</Link>
        </SignedOut>

        <li className='hidden sm:block'>
      <Link href={`/home`}>Home</Link>
        </li>

        <li className='hidden sm:block'>
      <Link href={`/about`}>About</Link>
        </li>
      </ul>
      <Link href={`/`} className='flex gap-1 items-center'>
      <span className='text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg'>IMDb</span>
    <span className='text-xl hidden sm:inline'>Clone</span>
    </Link>
    </div>
  )
}

export default Header