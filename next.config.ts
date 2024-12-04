import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'http2.mlstatic.com' },
      { protocol: 'https', hostname: 'media-c.arguilebr.com.br' },
      { protocol: 'https', hostname: 'media-a.arguilebr.com.br' },
      { protocol: 'https', hostname: 'cdn.cosmicjs.com' },
      { protocol: 'https', hostname: 'images.tcdn.com.br' },
      { protocol: 'https', hostname: 'galeradonarguile.com.br' },
      { protocol: 'https', hostname: 'cdn.zomoofficial.com' },
      { protocol: 'https', hostname: 'acdn.mitiendanube.com' },
      { protocol: 'https', hostname: 'cdn.meucatalogodigital.com' },
      { protocol: 'https', hostname: 'goldsmoke.com.br' },
      { protocol: 'https', hostname: 'www.secretsofnay.com' },
      { protocol: 'https', hostname: 'www.oasistabacaria.com' },
    ],
  },
}

export default nextConfig
