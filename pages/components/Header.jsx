import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <nav className='grid grid-cols-12 mx-auto container'>
            <div className='col-span-8 col-start-3 py-4'>
                <Link href='/'>
                    <h1 className='text-xl'>Home</h1>
                </Link>
            </div>
        </nav>
    )
}

export default Header
