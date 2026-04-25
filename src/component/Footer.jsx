import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className=' footer w-full bg-blue-400 overflow-hidden'>

        <div className='font-bold sm:text-xl px-10 py-2 whitespace-nowrap text-white animation_scroll'> Remember your tasks are saved into localStorage , if you delete the tasks it will be also removed from localStorage</div>
      
    </div>
  )
}

export default Footer
