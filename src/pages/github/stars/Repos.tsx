'use client'

import { ForkIcon, IssueIcon, LicenseIcon, Loading, StarIcon } from "components/Icons."
import { TRepo } from "./type"
import { useEffect, useState } from "react"


export default function Repos({ colors }: { colors: { [key: string]: string } }) {

    const [stars , setStars] = useState<string>('a')

    return (
        <>
            {
                stars
                 
            }
        </>
    )
}