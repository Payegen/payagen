import { GetStaticPropsContext } from 'next';
import React from 'react'
import fs from 'fs'
import path from 'path';
export default function doc( props) {
    console.log(props)
  return (
    <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-full w-full'>
        <h1>{props.title}</h1>
        <span className='text-sm text-gray-700'>{props.content}</span>
    </div>
  )
}
export async function getStaticPaths() {
    const mds = ['about', 'jobs', 'links', 'terms']
    return {
      paths: mds.map(slug => ({ params: { slug } })),
      fallback: false
    };
  }

export async function getStaticProps(context: GetStaticPropsContext){
    const {slug} = context.params

    const content = fs.readFileSync(path.join(process.cwd(), `data/md/${slug}.md`), 'utf-8')
    const titles = {
        about: '关于作者',
        jobs: '工作内推',
        links: '友情链接',
        terms: '用户协议',
      }
    return {
        props:{
            title: titles[slug as string],
            content
        }
    }
}