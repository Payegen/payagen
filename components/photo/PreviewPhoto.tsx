import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
interface PreImg  {
  isShow: boolean,
  data: {
    url:string,
    preload?:any
  },
  onClose: Function
}

export default function PreviewPhoto({isShow,data,onClose}:PreImg) {

  const cancelButtonRef = useRef(null)

  const closeHandle = ()=> {
    console.log('close dialog');
    
  }
  return (
    <Transition.Root show={isShow} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeHandle}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 h-full w-full overflow-y-auto flex justify-center items-center">
          <img className='border' src={data.url} alt="预览图" />

          <p className=' bg-gray-900'><span className='absolute top-4 right-4 cursor-pointer text-slate-100 hover:text-black' onClick={ ()=>{onClose(false)}}>X</span></p>
          
        </div>
      </Dialog>
    </Transition.Root>
  )
}
