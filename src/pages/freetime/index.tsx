import React from 'react'
import Head from 'next/head'
import AppHeader from 'components/AppHeader'
import {readFileSync} from 'fs'
import path from 'path'

export default function index(props) {
  const {freetime} = props 
  console.log(freetime);

  function goPath(url:string,e:any){
    console.log(url,e);
    window.location.href = url
  }

  return (
    <div className='flex flex-col p-8'>
      <Head><title>摸鱼推荐</title></Head>

      <AppHeader title='摸鱼推荐'></AppHeader>

      <div className="fullcontent">
        {
          freetime.map((item,index)=>(
            <div key={item.name+index} className='w-1/4 text-center bg-white rounded-md pt-4'>
              <h3>{item.name}</h3>
              <p className='text-left indent-8'>{item.description}</p>
              <button className='w-full text-right pr-4 mb-2 mt-2'
               onClick={(e)=> goPath(item.url,e)}>go</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export async function getStaticProps(){
  const freetime = readFileSync(path.join(process.cwd(), 'data/json/freetime.json'), 'utf-8')

  return {
    props:{
      freetime: JSON.parse(freetime)
    }
  }
}
