'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ProductItemsProps {
  id: number
  name: string
  price: number
  group: string
  image: string
  addToCart: (id: number) => void
  delay: number
}

function ProductItems({
  id,
  name,
  price,
  group,
  image,
  addToCart,
  delay,
}: ProductItemsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // TOGGLE MODAL OPEN AND CLOSE, AND RESET IMAGE LOAD STATE
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
    setIsImageLoaded(false)
  }

  // HANDLE IMAGE LOADING COMPLETION
  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: delay * 0.1,
          ease: 'easeOut',
        }}
        className="col-span-6 flex h-[14rem] w-full flex-col justify-between rounded-lg bg-slate-700 p-2 duration-500 ease-in-out hover:bg-slate-800 md:col-span-4 md:h-[20rem] md:p-4"
      >
        <div
          onClick={toggleModal}
          className="cursor-pointer rounded-lg bg-white"
        >
          <Image
            src={image}
            alt={group}
            width={500}
            height={500}
            className="h-[8rem] object-contain object-center md:h-[13rem]"
            title="Ver Produto"
          />
        </div>
        <h4 className="mt-2 text-xs lg:text-sm">{name}</h4>
        <div className="flex h-full items-end justify-between">
          <span>R$ {price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(id)}
            className="rounded-sm bg-cyan-800 px-2 py-1 duration-500 ease-in-out hover:bg-cyan-500"
          >
            Add +
          </button>
        </div>
      </motion.div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={toggleModal}
        >
          <div className="relative m-4 bg-white">
            <Image
              src={image}
              alt={group}
              width={500}
              height={500}
              quality={100}
              className="max-h-[60vh] w-full max-w-full object-cover object-center"
              onLoadingComplete={handleImageLoad}
            />

            {isImageLoaded && (
              <button
                onClick={toggleModal}
                className="absolute right-2 top-2 bg-gray-800 text-white"
              >
                <X />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ProductItems
