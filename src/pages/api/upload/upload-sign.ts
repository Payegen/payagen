// src/pages/api/upload-sign.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import type { NextApiRequest, NextApiResponse } from "next"
import { r2Client } from "@/utils/r2Client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  try {
    const fileName = req.query.fileName as string
    const contentType = req.query.contentType as string

    if (!fileName || !contentType) {
      return res.status(400).json({ error: "Missing fileName or contentType" })
    }

    const key = `uploads/${Date.now()}-${fileName}`

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      ContentType: contentType,
    })

    // ✅ 使用你封装好的客户端生成签名
    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 60 })

    return res.status(200).json({ uploadUrl: signedUrl, objectKey: key })
  } catch (error) {
    console.error("Error generating signed URL:", error)
    return res.status(500).json({ error: "Failed to generate signed URL" })
  }
}