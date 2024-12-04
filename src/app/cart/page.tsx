import Link from 'next/link'
import { BiSolidLeftArrowCircle } from 'react-icons/bi'

import CartItems from '@/components/CartItems'

export default function Cart() {
  return (
    <main>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-800 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-5xl items-end justify-between px-4 py-8">
          <Link
            href="/"
            title="Voltar"
            className="flex items-center gap-2 text-xl duration-500 ease-in-out hover:text-cyan-500"
          >
            <BiSolidLeftArrowCircle size={24} className="animate-pulse" />
            Voltar
          </Link>

          <h1 className="text-xl font-light">Meus pedidos</h1>
        </div>
      </header>
      <CartItems />
    </main>
  )
}
