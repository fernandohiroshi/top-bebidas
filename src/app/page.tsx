'use client'

import { dataProducts } from '@/api/datas'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { BiLogoInstagram, BiLogoWhatsapp, BiMap } from 'react-icons/bi'

import CartButton from '@/components/CartButton'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ProductItems from '@/components/ProductItems'

interface Product {
  id: number
  name: string
  price: number
  group: string
  image: string
}

interface CartItem extends Product {
  quantity: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    // CHECKS IF THE USER HAS ALREADY CONFIRMED ADULTHOOD
    const ageConfirmed = localStorage.getItem('ageConfirmed')
    const wasRedirected = localStorage.getItem('wasRedirected')

    // SHOW THE MODAL IF THE USER WAS REDIRECTED BEFORE OR HASN'T CONFIRMED AGE
    if (!ageConfirmed || wasRedirected === 'true') {
      setIsModalVisible(true)
      // CLEAR THE REDIRECTION FLAG AFTER SHOWING THE MODAL
      localStorage.removeItem('wasRedirected')
    }

    // LOAD PRODUCTS
    const groupOrder = [
      'narguile',
      'stem',
      'rosh',
      'vaso',
      'prato',
      'aluminio',
      'acessorios',
      'essencias',
      'carvao',
      'heads',
    ]

    // SORT PRODUCTS BY CATEGORY AND NAME
    const sortedProducts = [...dataProducts].sort((a, b) => {
      const groupA = groupOrder.indexOf(a.group)
      const groupB = groupOrder.indexOf(b.group)

      if (groupA === groupB) {
        return a.name.localeCompare(b.name)
      }
      return groupA - groupB
    })

    setProducts(sortedProducts)

    // RETRIEVE CART FROM LOCALSTORAGE
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const handleAgeConfirmation = (isAdult: boolean) => {
    // HANDLES THE AGE CONFIRMATION
    if (isAdult) {
      localStorage.setItem('ageConfirmed', 'true')
      setIsModalVisible(false)
    } else {
      localStorage.setItem('ageConfirmed', 'false')
      // SET THE REDIRECTION FLAG BEFORE REDIRECTING
      localStorage.setItem('wasRedirected', 'true')
      // REDIRECT TO AN EXTERNAL PAGE, LIKE GOOGLE
      window.location.href = 'https://www.google.com'
    }
  }

  const addToCart = (id: number) => {
    // ADD A PRODUCT TO THE CART
    const product = products.find((prod: Product) => prod.id === id)
    if (!product) return

    const existingProduct = cart.find((item) => item.id === id)

    let updateCart: CartItem[]

    if (existingProduct) {
      updateCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    } else {
      updateCart = [...cart, { ...product, quantity: 1 }]
    }

    setCart(updateCart)
    localStorage.setItem('cart', JSON.stringify(updateCart))

    toast.success(`${product.name} adicionado no carrinho`)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // HANDLES THE SEARCH INPUT CHANGE
    setSearchTerm(event.target.value)
  }

  const filteredProducts = products.filter((product) => {
    // FILTERS PRODUCTS BASED ON THE SEARCH TERM AND SELECTED CATEGORY
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesGroup = selectedGroup ? product.group === selectedGroup : true
    return matchesSearchTerm && matchesGroup
  })

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-950/20 backdrop-blur-3xl">
        <div className="mx-auto flex max-w-5xl items-end justify-between px-4 py-6">
          <Link
            href="/"
            className="text-sm duration-300 ease-in-out hover:text-cyan-500 md:text-lg"
          >
            HOOKAH ZONE
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              title="Whatsapp"
              className="duration-300 ease-in-out hover:text-emerald-500"
            >
              <BiLogoWhatsapp size={24} />
            </Link>
            <Link
              href="#"
              title="Instagram"
              className="duration-300 ease-in-out hover:text-amber-500"
            >
              <BiLogoInstagram size={24} />
            </Link>
            <Link
              href="#contact"
              title="Location"
              className="duration-300 ease-in-out hover:text-pink-500"
            >
              <BiMap size={24} />
            </Link>
            <CartButton itemCount={cart.length} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto min-h-screen w-full max-w-5xl scroll-mt-20 text-xs md:text-sm">
        {/* HERO SECTION */}
        <Hero />

        {/* PRODUCTS SECTION */}
        <section className="px-4 py-8">
          <h3 className="mb-4 text-2xl">Produtos</h3>

          {/* SEARCH INPUT */}
          <input
            type="text"
            placeholder="Procurar produto..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-6 w-full rounded border-4 p-2 text-neutral-950 outline-none hover:border-cyan-500"
          />

          {/* CATEGORY FILTER */}
          <div className="mb-6">
            <h4 className="mb-2 text-lg">Filtro por categoria:</h4>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
              {[
                'narguile',
                'stem',
                'rosh',
                'vaso',
                'prato',
                'aluminio',
                'acessorios',
                'essencias',
                'carvao',
                'heads',
              ].map((group) => (
                <label key={group} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="group"
                    value={group}
                    checked={selectedGroup === group}
                    onChange={() => setSelectedGroup(group)}
                    className="accent-cyan-500"
                  />
                  {group}
                </label>
              ))}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="group"
                  value=""
                  checked={selectedGroup === ''}
                  onChange={() => setSelectedGroup('')}
                  className="accent-cyan-500"
                />
                todos
              </label>
            </div>
          </div>

          {/* RENDERING FILTERED PRODUCTS */}
          <div className="grid h-full grid-flow-dense grid-cols-12 gap-3">
            {filteredProducts.map((product, index) => (
              <ProductItems
                key={product.id}
                id={product.id}
                name={product.name}
                group={product.group}
                image={product.image}
                price={product.price}
                addToCart={addToCart}
                delay={index}
              />
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </main>

      {/* AGE CONFIRMATION MODAL */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm rounded-lg bg-white p-8 text-start text-black">
            <h2 className="mb-1 text-xl">Você tem mais de 18 anos?</h2>
            <p className="mb-4 text-sm">
              <b className="text-red-700">Aviso:</b> Fumar é prejudicial à saúde
              e causa dependência. Produtos proibidos para menores de 18 anos.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleAgeConfirmation(false)}
                className="rounded bg-red-700 px-4 py-2 text-white"
              >
                Não
              </button>
              <button
                onClick={() => handleAgeConfirmation(true)}
                className="rounded bg-green-700 px-4 py-2 text-white"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
