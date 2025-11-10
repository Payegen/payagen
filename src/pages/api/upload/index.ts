import type { NextApiRequest, NextApiResponse } from 'next'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2Client } from '@/utils/r2Client'
import { randomUUID } from 'crypto'
import formidable from 'formidable'
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false, // 关闭 Next.js 默认解析，使用 formidable
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  const form = formidable({ multiples: false })

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Form parse error' })

    // const file = files.file as formidable.File
    const file = Array.isArray(files.file) ? files.file[0] : files.file
    if (!file) return res.status(400).json({ error: 'No file uploaded' })
      
    console.log(file,'file');
    
    const buffer = await fs.readFile(file.filepath)
    const fileExt = file.originalFilename?.split('.').pop() || 'bin'
    const objectKey = `uploads/${randomUUID()}.${fileExt}`

    try {
      await r2Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: objectKey,
          Body: buffer,
          ContentType: file.mimetype || 'application/octet-stream',
        })
      )

      const fileUrl = `${process.env.R2_PUBLIC_URL_DEV}/${objectKey}`

      // ✅ 可选：写入数据库
      // await db.wallpapers.create({ data: { url: fileUrl, name: file.originalFilename } })

      res.status(200).json({ url: fileUrl })
    } catch (e) {
      console.error(e)
      res.status(500).json({ 
        error: 'Upload failed',
        info: e
      
      })
    }
  })
}