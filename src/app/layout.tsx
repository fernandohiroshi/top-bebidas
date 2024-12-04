import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'

import DisableRightClick from '@/components/DisableRightClick'

import Link from 'next/link'

const m = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Top Bebidas - Foz do Iguaçu',
  description:
    'Bebidas, Tabacaria, Produtos para Narguile e Conveniência em Foz do Iguaçu.',
  keywords: [
    ' Bebidas Foz do Iguaçu',
    ' Tabacaria Foz do Iguaçu',
    ' Produtos para narguile',
    ' Conveniência Foz do Iguaçu',
    ' Loja de bebidas Foz do Iguaçu',
    ' Narguile Foz do Iguaçu',
    ' Acessórios para narguile',
    ' Fumo e tabacaria',
    ' Cervejas artesanais Foz do Iguaçu',
    ' Conveniência Foz do Iguaçu',
    ' Loja de conveniência',
    ' Tabacaria e narguile',
    ' Loja de narguile em Foz do Iguaçu',
    ' Produtos para fumo',
    ' Roshs para narguile',
    ' Essências para narguile',
    ' Carvão para narguile',
    ' Mangueira para narguile',
    ' Acessórios para narguile Foz do Iguaçu',
    ' Cachimbo e acessórios Foz do Iguaçu',
    ' Tabacaria e acessórios para fumo',
    ' Fumo para narguile Foz do Iguaçu',
    ' Shisha Foz do Iguaçu',
    ' Filtro de narguile Foz do Iguaçu',
    ' Charcoal para narguile',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: 'Top Bebidas - Foz do Iguaçu',
    description:
      'Bebidas, Tabacaria, Produtos para Narguile e Conveniência em Foz do Iguaçu.',
    url: 'https://www.topbebidas.com',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/a7fc4020-b202-11ef-8a63-eb57d6c77a36-top-bebidas.png',
        width: 1200,
        height: 630,
        alt: 'Top Bebidas - Foz do Iguaçu',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="!scroll-smooth">
      <body className={`${m.className} antialiased`}>
        <DisableRightClick />
        <Toaster position="top-center" reverseOrder={false} />
        {children}
        <Link
          href="#"
          className="fixed bottom-4 right-4 hidden duration-300 ease-in-out hover:scale-110 hover:text-cyan-500 md:block"
        >
          <BsFillArrowUpSquareFill size={32} />
        </Link>
      </body>
    </html>
  )
}
