'use client'

import Link from 'next/link'
import { BiSolidCommentError } from 'react-icons/bi'

export default function NotFound() {
  return (
    <div className="flex h-[90vh] animate-pulse flex-col items-center justify-center">
      <BiSolidCommentError size={160} className="animate-bounce text-red-700" />
      <h1 className="mb-8 text-center text-4xl">Essa pagina nao existe.</h1>
      <Link
        href="/"
        className="border bg-cyan-800 p-2 text-sm duration-500 ease-in-out hover:bg-cyan-500"
      >
        Voltar para Home
      </Link>
    </div>
  )
}
