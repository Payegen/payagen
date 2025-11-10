'use client'

import { useState } from 'react'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState<string>('')

  async function handleUpload() {
    if (!file) return alert('请选择文件')

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    if (data.url) {
      setUrl(data.url)
    }
  }

  return (
    <div className="p-8">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleUpload}>上传</button>

      {url && (
        <div className="mt-4">
          <p>上传成功：</p>
          <a href={url} target="_blank">{url}</a>
          <br />
          <img src={url} alt="uploaded" width={200} />
        </div>
      )}
    </div>
  )
}