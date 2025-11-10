import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { readFileSync } from 'fs'
import path from 'path'
import Link from 'next/link'
import { Logos } from 'components/Icons.'
import Dock from 'components/Dock'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })

export default function Home({apps,home}) {
  const router = useRouter()
  const openApp = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.location.href = url
    } else {
      router.push(url)
    }
  }
  return (
    <>
      <Head>
        <title>Payegen空间</title>
        <meta name="description" content="Payegen's personal website 个人网站" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main  className='flex min-h-screen flex-col md:flex-row flex-1 gap-4 md:gap-6 p-8 '>

        <div className='flex flex-col gap-4 md:gap-6'>
          <div className='bg-white w-full md:w-72 rounded-lg shadow flex flex-col gap-4 items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-2 pt-6 pb-2'>
              <img className="w-28 h-28 rounded-full" src={home.user.avatar} alt="" />
              <div className="text-xl font-medium text-gray-800">{home.user.nickname}</div>
              <div className='text-gray-500'>
                <span className='text-sm'>{home.user.bio}</span>
              </div>
            </div>
            <div className='flex flex-row gap-3 items-center justify-center text-lg border-t border-gray-200 py-3 w-full'>
              {
                home.user.brands.map(item => (
                  <a href={item.url} target="_blank" rel="noreferrer" key={item.icon}>
                    {
                     Logos[item.icon]({ className: 'text-xl text-gray-500/75 hover:text-gray-700' })
                    }
                  </a>
                ))
              }
            </div>
          </div>

          <div className='bg-white w-full md:w-72 rounded-lg shadow flex flex-row space-x-6 items-center justify-center py-4'>
            {
              [home.languages, home.skills, home.softwares].map((item, index) => (
                <Dock name={item.name} key={index} data={item.children}></Dock>
              ))
            }
          </div>

          <div className='md:flex hidden flex-col items-center space-y-2 text-gray-500 text-xs'>
            <div className='flex flex-row space-x-1 justify-center'>
              <Link href='/doc/about'>
                <span className="text-gray-400 hover:text-blue-600 cursor-pointer">关于作者</span>
              </Link>
              <span>·</span>
              <Link href='/doc/jobs'>
                <span className="text-gray-400 hover:text-blue-600 cursor-pointer">工作内推</span>
              </Link>
              <span>·</span>
              <Link href='/doc/links'>
                <span className="text-gray-400 hover:text-blue-600 cursor-pointer">友情链接</span>
              </Link>
              <span>·</span>
              <Link href='/doc/terms'>
                <span className="text-gray-400 hover:text-blue-600 cursor-pointer">用户协议</span>
              </Link>
            </div>
            <div className='text-center text-gray-400'>
              <a href="https://github.com/Payegen" target="_blank" rel="noreferrer" className='text-rose-600'>Payegen</a> © 2023 All Rights Reserved
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow w-full">
          <div className='flex flex-row flex-wrap gap-8 p-8 '>
              {
                apps.map( (item,index)=>(
                  <div key={index} className='flex flex-col items-center gap-3 cursor-pointer' onClick={()=>{openApp(item.url)}}>
                    <img src={item.icon} alt=""  className='h-16 w-16'/>
                    <span className='text-sm text-gray-800'>{item.name}</span>
                  </div>
                ))
              }
          </div> 
        </div>
               
      </main>
    </>
  )
}
export async function getStaticProps() {

  const apps = readFileSync(path.join(process.cwd(), 'data/json/apps.json'), 'utf-8')
  const home = readFileSync(path.join(process.cwd(), 'data/json/home.json'), 'utf-8')

  return {
    props: {
      apps: JSON.parse(apps),
      home: JSON.parse(home),
    },
  }

}
