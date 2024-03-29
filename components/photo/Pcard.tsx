import React from 'react'

export default function Pcard({name,url}) {
  return (
    <div>
      <div className='h-16 w-32 border-t-2 shadow-xl'>
        <div className='h-8 bg-title text-slate-300'>{name}</div>
        <img src={url} alt="" />
      </div>
    </div>
  )
}
