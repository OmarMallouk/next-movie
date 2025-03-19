'use client';
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavbarItem({title, param}) {
    const genre = usePathname().split('/')[2];
  return (
    <div>
        <Link
        className={`hover:text-amber-600 font-semibold ${genre === param ? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg' : ''}`} href={`/top/${param}`}>{title}</Link>
    </div>
  )
}

export default NavbarItem