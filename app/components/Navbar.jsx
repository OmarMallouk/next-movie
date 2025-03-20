import React from 'react'
import NavbarItem from './NavbarItem'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='flex dark:bg-gray-600 bg-amber-100 p-4 lg:text-lg justify-center gap-6'>
        <NavbarItem title='Sci-Fi' param='Sci-Fi'/>
        <NavbarItem title='Action' param='Action'/>
        <Link href="/movies" className='text-blue-600 hover:underline' >Movies</Link>
    </div>
  )
}

export default Navbar