import { GetStaticPropsContext } from 'next';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import fs from 'fs'
import path from 'path';
import Head from 'next/head';
import AppHeader from 'components/AppHeader'
// import MarkdownEditor from 'components/MarkdownEditor'
import dynamic from 'next/dynamic'
const MarkdownEditor = dynamic(() => import('../../../components/MarkdownEditor'), {
  ssr: false,
})
export default function doc( props) {

  console.log(props)
  return (
    <div className='flex flex-col p-8'>
      <Head>
        <title>{props.title}</title>
      </Head>

      <AppHeader title={props.title}></AppHeader>
      
      <div className='pt-4 px-4 rounded-md shadow bg-bgy1 markdown-body'>
          
        <h1 className='text-center mt-2 text-2xl'>{props.title}</h1>
        
        <ReactMarkdown 
          children={props.content} 
          remarkPlugins={[[gfm]]} 
          components={
            {
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) :(<code className={className} {...props}>
                      {children}
                    </code>
                  )
              }
            }
          }
        />

        {/* <MarkdownEditor /> */}
          
      </div>
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