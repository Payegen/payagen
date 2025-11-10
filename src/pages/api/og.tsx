// pages/api/og.ts
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || '默认标题';
  const desc = searchParams.get('desc') || '默认描述';
  const bg = searchParams.get('bg') || '';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: bg ? `url(${bg})` : '',
          backgroundColor: bg ? 'transparent' : '#f0f0f0',
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
          padding: '80px',
          color: '#111',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            marginBottom: 20,
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '20px 30px',
            borderRadius: 12,
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            backgroundColor: 'rgba(255,255,255,0.6)',
            padding: '16px 28px',
            borderRadius: 10,
            maxWidth: '900px',
          }}
        >
          {desc}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}