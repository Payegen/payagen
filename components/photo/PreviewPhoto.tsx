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
  const [scale, setScale] = useState(1)
  
  const closeHandle = () => {
    onClose(false)
    setScale(1)
  }

  const handleZoom = (type: 'in' | 'out') => {
    if (type === 'in') {
      setScale(prev => prev + 0.1)
    } else {
      setScale(prev => prev > 0.1 ? prev - 0.1 : prev)
    }
  }

  const resetZoom = () => {
    setScale(1)
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
          <img 
            className='border transition-transform duration-200' 
            style={{ transform: `scale(${scale})` }}
            src={data.url} 
            alt="预览图" 
          />

          <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full flex gap-4'>
            <button 
              className='text-white hover:text-gray-300'
              onClick={() => handleZoom('out')}
            >
              -
            </button>
            <button 
              className='text-white hover:text-gray-300'
              onClick={resetZoom}
            >
              重置
            </button>
            <button 
              className='text-white hover:text-gray-300'
              onClick={() => handleZoom('in')}
            >
              +
            </button>
          </div>

          <button 
            className='absolute top-4 right-4 cursor-pointer text-slate-100 hover:text-black'
            onClick={closeHandle}
          >
            X
          </button>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
