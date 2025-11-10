import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// export async function GET() {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const users = await prisma.user.findMany();
  res.status(200).json(users)
}
