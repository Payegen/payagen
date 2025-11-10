import { useMemo } from "react"

const Page = ({ defaultData }: { defaultData: Array<{ id: string; url: string }> }) => {
    const processedData = useMemo(() => {
        return defaultData.map((item) => ({
            ...item,
            url: item.url.replace("https://", "http://")
        }))
    }, [defaultData])

    const datares = useMemo(() => {
        return [...processedData, ...processedData, ...processedData]
    }, [processedData])

    return (
        <>
            {datares.map((item) => (
                <div key={item.id}>
                    <img src={item.url} alt={item.id} />
                </div>
            ))}
        </>
    )
}

export default Page