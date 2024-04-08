'use client'
import React from 'react'
import { signOut } from 'next-auth/react'

const DashboardPage = () => {
  return (
    <div className='text-white flex flex-col justify-center items-center'>
      <h1>dashboar</h1>
      <button className='p-2 rounded-lg bg-blue-600'
        onClick={() => signOut()}
      >logout</button>
    </div>
  )
}

export default DashboardPage