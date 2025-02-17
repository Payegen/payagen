'use client'

import { ForkIcon, IssueIcon, LicenseIcon, Loading, StarIcon } from "components/Icons."
import { TRepo } from "../../../type/type"
import { useEffect, useState } from "react"


export default function Repos({ colors }: { colors: { [key: string]: string } }) {
    const [data, setData] = useState<TRepo[]>([])
    const [stars , setStars] = useState<string>('a')
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        fetch(`https://api.github.com/users/Payegen/starred`,{
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => setData(data))
            .finally(() => setLoading(false))
    },[])
    return (
        <>
           { loading ? <Loading /> : <div className="w-full grid grid-cols-1 p-4 gap-4 lg:p-8 lg:gap-8 lg:grid-cols-2 bg-bgy1 rounded-lg">
                {
                  data.length &&  data.map(item => 
                    (
                        <div key={item.id} className="box border flex w-full rounded-lg p-4 gap-4 md:gap-6">
                            <a href={item.owner.html_url} target="_blank" rel='noreferrer' className="h-fit">
                                <img width={48} height={48} src={item.owner.avatar_url} alt="" className="rounded-xl" />
                            </a>
                            <div className="flex-1">
                                <a href={item.html_url} target="_blank" rel='noreferrer' className="font-semibold hover:text-blue-600">{item.full_name}</a>
                                <div className="flex gap-3 text-xs cursor-default my-3 text-gray-500">
                                    <div className="flex">
                                        <StarIcon className="mr-1 w-4" />
                                        {item.stargazers_count.toLocaleString()}
                                    </div>
                                    <div className="flex">
                                        <ForkIcon className="mr-1 w-4" />
                                        {item.forks.toLocaleString()}
                                    </div>
                                    <div className="flex">
                                        <IssueIcon className="mr-1 w-4" />
                                        {item.open_issues.toLocaleString()}
                                    </div>
                                </div>
                                <p className="text-sm font-sans text-gray-700">{item.description}</p>
                                <div className="text-gray-600 flex flex-row gap-2 text-xs flex-wrap mt-3">
                                    {
                                        item.topics.map(topic => (
                                            <a key={topic} href={`https://github.com/topics/${topic}`} target="_blank" rel='noreferrer' className="rounded p-1 border a-tag">
                                                {topic}
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    )
                }   
            </div>}
            {/* <InfiniteScrollLoader sentryRef={sentryRef} showLoading={showLoading} /> */}
        </>
    )
}