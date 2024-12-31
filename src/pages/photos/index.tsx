import React, { useState } from 'react'
import Head from 'next/head'
import AppHeader from 'components/AppHeader'
import Pcard from 'components/photo/Pcard'
import PreviewPhoto from 'components/photo/PreviewPhoto';

export default function index() {
  const url = "https://act-webstatic.mihoyo.com/puzzle/hk4e/pz_Q9C83JdzSN/resource/puzzle/2024/03/12/25d9fa5f3848ca53381d10007963b07a_341421159113708091.mp4?x-oss-process=video/snapshot,t_1,f_jpg,m_fast"

  const [showPhoto, setShowPhoto] = useState(false)
  const [Pdata, setPdata] = useState({ url })
  
  const openHandle = (e, data) => {
    console.log(e, data);
    setPdata(data)
    setShowPhoto(true)
  }

  return (
    <div className='flex flex-col p-8 min-h-screen'>
      <Head><title>相册</title></Head>
      
      <AppHeader title='相册'></AppHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <Pcard name={"test"} url={url} click={openHandle} />
        <Pcard name={"test"} url={url} click={openHandle} />
        <Pcard name={"test"} url={url} click={openHandle} />
        <Pcard name={"test"} url={url} click={openHandle} />
      </div>

      <PreviewPhoto isShow={showPhoto} data={Pdata} onClose={setShowPhoto}></PreviewPhoto>
    </div>
  )
}
