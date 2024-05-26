import React from 'react'
import { CardProduct } from '@/components/ui/CardProduct'

const Popular = () => {
  return (
    <div className='text-center py-10 bg-color'>
         <div className=' px-2 py-5 inline-block bg-color-green text-color-black hover:bg-color-gray transition-color '>
   BEST SELLER
      </div>
     
      <div >
      <div className='px-10 py-10 h-100 grid grid-cols-5 gap-5 content-between'>
      <CardProduct /> 
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      </div>
        </div>
    </div>
  )
}

export default Popular
