import React from 'react'

interface Props {
  name: string
  url: string
  click: Function
}

export default function Pcard({ name, url, click }: Props) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={(e) => click(e, { url })}
    >
      <div className="aspect-w-16 aspect-h-9 relative">
        <img 
          src={url} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
      </div>
    </div>
  )
}
