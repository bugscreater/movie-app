import React from 'react'
import Image from "next/image";



function Card({img,name}) {


  return (
    <div>
   
     <img src ={img} alt="" className='object-contain max-h-100 max-w-100' />
     <div className="mt-1 text-md text-white transition-all duration-100 ease-in-out group-hover:font-bold flex justify-center items-center">{name}</div>
    
    </div>
  )
}

export default Card