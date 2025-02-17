import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import Head from 'next/head'
import AppHeader from 'components/AppHeader'
import {readFileSync} from 'fs'
import path from 'path'
import Masonry from 'react-masonry-css' // 需要先安装: npm install react-masonry-css

export default function index(props) {
  const {freetime} = props 
  const [visibleItems, setVisibleItems] = useState(9)
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType] = useState('全部')
  const [hasMore, setHasMore] = useState(true)
  const [activeTabPosition, setActiveTabPosition] = useState({ left: 0, width: 0 })
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement }>({})

  // 提取所有唯一的类型
  const types = useMemo(() => {
    const typeSet = new Set<string>(freetime.map(item => item.type))
    return ['全部', ...Array.from(typeSet)]
  }, [freetime])

  // 根据类型筛选内容
  const filteredItems = useMemo(() => {
    const filtered = selectedType === '全部' 
      ? freetime 
      : freetime.filter(item => item.type === selectedType)
    
    // 更新是否有更多数据的状态
    setHasMore(visibleItems < filtered.length)
    return filtered
  }, [freetime, selectedType, visibleItems])

  const breakpointColumns = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  }

  // 优化加载更多功能
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return

    setLoading(true)
    
    // 使用 setTimeout 来模拟网络请求
    setTimeout(() => {
      requestAnimationFrame(() => {
        setVisibleItems(prev => {
          const next = prev + 9 // 每次加载9条
          // 检查是否还有更多数据
          setHasMore(next < filteredItems.length)
          return next
        })
        setLoading(false)
      })
    }, 300) // 添加小延迟以展示加载动画
  }, [loading, hasMore, filteredItems.length])

  // 优化滚动监听
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // 提前100px触发加载
      }
    )

    const sentinel = document.getElementById('scroll-sentinel')
    if (sentinel) observer.observe(sentinel)

    return () => observer.disconnect()
  }, [loadMore, hasMore, loading])

  function goPath(url: string, e: React.MouseEvent) {
    e.preventDefault()
    window.open(url)
  }

  // 更新选中标签的位置
  const updateActiveTabPosition = useCallback((type: string) => {
    const activeTab = tabsRef.current[type]
    if (activeTab) {
      const { offsetLeft, offsetWidth } = activeTab
      setActiveTabPosition({
        left: offsetLeft,
        width: offsetWidth,
      })
    }
  }, [])

  // 初始化和窗口大小改变时更新位置
  useEffect(() => {
    updateActiveTabPosition(selectedType)
    
    const handleResize = () => {
      updateActiveTabPosition(selectedType)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [selectedType, updateActiveTabPosition])

  // 优化类型切换
  const handleTypeChange = useCallback((type: string) => {
    setSelectedType(type)
    setVisibleItems(9)
    setHasMore(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // 添加复制链接功能
  const copyUrl = async (url: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(url)
      // 可以添加一个提示，这里用 alert 代替，建议使用 toast 组件
      alert('链接已复制')
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className='flex flex-col p-8 min-h-screen bg-gray-50'>
      <Head><title>摸鱼推荐</title></Head>
      <AppHeader title='摸鱼推荐'></AppHeader>

      <div className="w-full -ml-6">
        {/* 类型标签栏 */}
        <div className="relative flex flex-wrap gap-2 ml-6 mt-4 mb-6">
          {/* 背景滑块 */}
          <div 
            className="absolute transition-all duration-300 ease-out bg-blue-500 rounded-full"
            style={{
              left: activeTabPosition.left,
              width: activeTabPosition.width,
              height: '100%',
              transform: 'translateX(0)',
              zIndex: 0,
            }}
          />
          
          {types.map(type => (
            <button
              key={type}
              ref={el => {
                if (el) tabsRef.current[type] = el
              }}
              onClick={() => handleTypeChange(type)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedType === type 
                  ? 'text-white' 
                  : 'text-gray-600 hover:text-gray-900'}`}
            >
              {type}
            </button>
          ))}
        </div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-full"
          columnClassName="pl-6 bg-clip-padding space-y-6" // 增加列间距和垂直间距到 24px
        >
          {filteredItems.slice(0, visibleItems).map((item, index) => (
            <div 
              key={item.name + index} 
              className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl 
                       transition-all duration-300 flex flex-col break-inside-avoid'
              style={{
                minHeight: `${Math.floor(Math.random() * (460 - 260) + 260)}px`
              }}
            >
              <div className='p-5'> {/* 增加内边距 */}
                <div className='relative w-full aspect-video mb-5 overflow-hidden rounded-lg'>
                  <img 
                    src={`${item.url}/favicon.ico`}
                    alt={item.name}
                    className='w-full h-full object-cover'
                    loading="lazy"
                    onError={(e) => {
                      // @ts-ignore
                      e.target.src = item.iconimg
                    }}
                  />
                  <span className='absolute top-2 right-2 px-3 py-1.5 bg-black bg-opacity-50 
                                 text-white text-xs rounded-full'>
                    {item.type}
                  </span>
                </div>
                
                <h3 className='text-lg font-bold text-gray-800 mb-3'>{item.name}</h3>
                
                <p className='text-gray-600 text-sm leading-relaxed mb-5'>
                  {item.description}
                </p>
              </div>

              <div className='mt-auto p-4 border-t flex justify-between items-center'> 
                {/* 操作按钮组 - 改为横向布局 */}
                <h3 className='text-sm text-gray-500'>{item.type}</h3>
                
                <div className='flex items-center gap-2'>
                  <button 
                    onClick={(e) => copyUrl(item.url, e)}
                    className='p-2 text-gray-400 hover:text-gray-600 rounded-full 
                              transition-colors duration-200 flex items-center justify-center'
                    title='复制链接'
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                      />
                    </svg>
                  </button>

                  <button 
                    onClick={(e) => goPath(item.url, e)}
                    className='p-2 text-gray-400 hover:text-gray-600 rounded-full 
                              transition-colors duration-200 flex items-center justify-center'
                    title='访问网站'
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>

      {/* 优化加载状态显示 */}
      {(hasMore || loading) && (
        <div 
          id="scroll-sentinel" 
          className="flex justify-center items-center h-20 mt-4"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">加载中...</span>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              上滑加载更多
            </div>
          )}
        </div>
      )}

      {/* 显示加载完成状态 */}
      {!hasMore && filteredItems.length > 0 && (
        <div className="text-center text-gray-500 mt-8 mb-4">
          已经到底啦 ~
        </div>
      )}

      {/* 显示无数据状态 */}
      {filteredItems.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          暂无相关数据
        </div>
      )}
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
