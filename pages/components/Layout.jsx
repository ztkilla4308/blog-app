import React from 'react'
import Header from './Header'

function Layout({children}) {
    return (
        <div className='flex flex-col'>
            <Header/>
            {children}
        </div>
    )
}

export default Layout
