import React from 'react'
import Head from 'next/head'
import AppHeader from 'components/AppHeader'
import Pcard from 'components/photo/Pcard'
export default function index() {
  const url = "https://act-webstatic.mihoyo.com/puzzle/hk4e/pz_Q9C83JdzSN/resource/puzzle/2024/03/12/25d9fa5f3848ca53381d10007963b07a_341421159113708091.mp4?x-oss-process=video/snapshot,t_1,f_jpg,m_fast"
  return (
    <div className='flex flex-col p-8 h-screen'>
      <Head><title>相册</title></Head>
      
      <AppHeader title='相册'></AppHeader>

      <div className="fullcontent">

        <Pcard name={"test"} url={url} />
        <Pcard name={"test"} url={url} />
        <Pcard name={"test"} url={url} />
        <Pcard name={"test"} url={url} />

      </div>
    </div>
  )
}
