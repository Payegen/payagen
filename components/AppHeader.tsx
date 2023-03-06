import {useRouter} from "next/router"

export default function AppHeader(props){
  let router = useRouter()

  function goHome() {
    router.push('/')
  }
  return (
    <div className="w-full p-4 mb-4 bg-white rounded-lg shadow flex flex-row space-x-4 items-center justify-start">
      <span className="cursor-pointer" onClick={goHome}>🏠</span> <span>{'>'}</span> <span>{ props.title}</span>
    </div>
  )
}