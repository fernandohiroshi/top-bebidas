import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import DisableRightClick from '@/components/DisableRightClick'

const m = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Top Bebidas',
  description:
    'Bebidas, Tabacaria, Produtos para Narguile e Conveniência em Foz do Iguaçu',
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
      </body>
    </html>
  )
}
