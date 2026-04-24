import React from 'react'

const NavBar = () => {
  return (
    <div className='nav w-full h-[5vh]  bg-blue-400  flex justify-around gap-6 sm:justify-between items-center sm:px-20  '>
        <div className='font-extrabold sm:text-2xl  text-white cursor-pointer hover:underline hover:scale-x-112'>i-Task</div>
        <div className='space-x-3 sm:space-x-8'>
            <span className='font-bold sm:text-2xl text-white cursor-pointer hover:underline inline-block hover:scale-x-112'>Home</span>
            <span className='font-bold sm:text-2xl text-white cursor-pointer hover:underline inline-block hover:scale-x-112'>contact</span>
            <span className='font-bold sm:text-2xl text-white cursor-pointer hover:underline inline-block hover:scale-x-112'>about</span>
        </div>
      
    </div>
  )
}

export default NavBar
