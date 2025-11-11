/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState<string>('')

  async function uploadFile() {
    if (!file) return alert('请选择文件')
    // 1️⃣ 请求签名 URL
    const res = await fetch(
      `/api/upload/upload-sign?fileName=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`
    )
    const { uploadUrl, objectKey } = await res.json()
  
    // 2️⃣ 使用签名 URL 直传 R2
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    })
  
    // 3️⃣ 拼出文件访问 URL（根据你的 R2 公网访问地址）
    const publicUrl = `${process.env.NEXT_PUBLIC_IMG_URL_DEV}/${objectKey}`
  
    console.log("✅ 上传成功：", publicUrl)
    window.alert("✅ 上传成功：")
    setUrl(publicUrl)
    return publicUrl
  }

  return (
    <div className="p-8">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={uploadFile} className='bg-blue-500 text-white p-2 rounded-md'>上传</button>

      {url && (
        <div className="mt-4">
          <p>上传成功：</p>
          <a href={url} target="_blank" rel="noreferrer">{url}</a>
          <br />
          <img src={url} alt="uploaded" width={200} />
        </div>
      )}
    </div>
  )
}