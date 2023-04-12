import React from 'react'
import Head from 'next/head'
import AppHeader from 'components/AppHeader'
export default function index() {
  return (
    <div className='flex flex-col p-8'>
      <Head><title>摸鱼推荐</title></Head>
      
      <AppHeader title='摸鱼推荐'></AppHeader>

      <div className="fullcontent">
        hello
      </div>
    </div>
  )
}
