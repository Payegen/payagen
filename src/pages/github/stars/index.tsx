import React from 'react'
import Head from 'next/head'
import AppHeader from 'components/AppHeader'
import Repos from './Repos'
export default function index() {

  return (
    <div className='flex flex-col p-8 h-screen'>
      <Head><title>开源项目</title></Head>
      
      <AppHeader title='开源项目'></AppHeader>

      <div className="fullcontent">
        <Repos colors={ {a:'a'}}/>
      </div>
    </div>
  )
}
