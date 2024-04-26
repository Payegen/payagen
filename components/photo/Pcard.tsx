import React from 'react'

export default function Pcard({name,url,click}) {
  return (
    <div className='w-[400px] h-[300px] border-spacing-1 rounded-lg mb-4 shadow-xl hover:shadow-lg' onClick={(e)=>{click(e,{name,url})}}>
      <div className='h-full w-full border-t-2 text-center' >
        
        <img className=' h-3/4' src={url} alt="" />

        <div className='h-8 bg-title text-slate-500'>{name}</div>
      </div>
    </div>
  )
}
