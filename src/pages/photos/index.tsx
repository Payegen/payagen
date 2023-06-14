import React from 'react'
import Head from 'next/head'
import AppHeader from 'components/AppHeader'

export default function index() {
  return (
    <div className='flex flex-col p-8 bg-gray-900 h-screen'>
      <Head><title>相册</title></Head>
      
      <AppHeader title='相册'></AppHeader>

      <div className="fullcontent">
        hello
      </div>
    </div>
  )
}
