// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

type Data = {
  [string: string]: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	const filepath = path.join(process.cwd(), 'data', 'json', 'freetime.json')
	console.error(filepath,'filepath');
	const result = fs.readFileSync(filepath,{
		encoding: 'utf-8',
		flag: 'r'
	})
	console.log(result,'result');
	
  res.status(200).json({ code: 200, message: 'success' ,data: result})
}
