'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsCartX } from 'react-icons/bs'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'

function CartItems() {
  // STATE TO STORE THE CART ITEMS (INITIALLY EMPTY ARRAY)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([])

  // STATE TO STORE THE TOTAL PRICE OF THE CART
  const [total, setTotal] = useState(0)

  // STATE TO STORE THE INPUT FIELDS FOR DELIVERY DATA
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    address: '',
    country: '',
  })

  // STATE TO STORE VALIDATION ERRORS FOR DELIVERY FIELDS
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
    country: '',
  })

  // LOAD THE CART FROM LOCAL STORAGE WHEN THE COMPONENT IS MOUNTED
  useEffect(() => {
    const storageCart = localStorage.getItem('cart')
    if (storageCart) {
      setCart(JSON.parse(storageCart))
    }
  }, [])

  // CALCULATE THE TOTAL PRICE WHENEVER THE CART CHANGES
  useEffect(() => {
    const newTotal = cart.reduce((c, item) => c + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cart])

  // HANDLE INCREMENTING THE QUANTITY OF AN ITEM IN THE CART
  const handleIncrement = (id: number) => {
    const updateCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    )
    setCart(updateCart)
    localStorage.setItem('cart', JSON.stringify(updateCart))
  }

  // HANDLE DECREMENTING THE QUANTITY OF AN ITEM IN THE CART
  const handleDecrement = (id: number) => {
    const existingProduct = cart.find((item) => item.id === id)
    if (existingProduct && existingProduct.quantity > 1) {
      const updateCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      setCart(updateCart)
      localStorage.setItem('cart', JSON.stringify(updateCart))
    } else if (existingProduct && existingProduct.quantity === 1) {
      const updateCart = cart.filter((item) => item.id !== id)
      setCart(updateCart)
      localStorage.setItem('cart', JSON.stringify(updateCart))
    }
  }

  // VALIDATE THE FIELDS WHEN THE USER INTERACTS WITH THEM
  const validateFields = (
    field: 'name' | 'phone' | 'address' | 'country',
    value: string,
  ) => {
    switch (field) {
      case 'name':
        return value ? '' : 'Por favor, insira seu nome completo.'
      case 'phone':
        const phoneRegex = /^[0-9]{9,15}$/
        return phoneRegex.test(value)
          ? ''
          : 'Por favor, insira um número de telefone válido.'
      case 'address':
        return value ? '' : 'Por favor, insira seu endereço.'
      case 'country':
        return value ? '' : 'Por favor, insira seu país.'
      default:
        return ''
    }
  }

  // UPDATE THE FIELD VALUE AND CHECK FOR VALIDATION ERRORS
  const handleChange = (
    field: 'name' | 'phone' | 'address' | 'country',
    value: string,
  ) => {
    setFields({ ...fields, [field]: value })
    setErrors({ ...errors, [field]: validateFields(field, value) })
  }

  // VALIDATE THE FIELD WHEN THE USER LEAVES THE INPUT FIELD
  const handleBlur = (field: 'name' | 'phone' | 'address' | 'country') => {
    setErrors({ ...errors, [field]: validateFields(field, fields[field]) })
  }

  // HANDLE SENDING THE ORDER DETAILS VIA WHATSAPP WHEN THE USER CLICKS "ENVIAR PEDIDO"
  const handleWhatsappOrderApp = () => {
    const newErrors = {
      name: validateFields('name', fields.name),
      phone: validateFields('phone', fields.phone),
      address: validateFields('address', fields.address),
      country: validateFields('country', fields.country),
    }

    setErrors(newErrors)

    // IF THERE ARE ANY VALIDATION ERRORS, DISPLAY AN ERROR MESSAGE AND STOP THE PROCESS
    if (Object.values(newErrors).some((error) => error)) {
      toast.error('Por favor, preencha todos os dados corretamente.')
      return
    }

    // CREATE THE MESSAGE WITH ORDER DETAILS AND CUSTOMER INFORMATION
    const orderMsg = cart
      .map((item) => `${item.quantity} ${item.name},`)
      .join('\n')
    const fieldsMsg = `Contato:\n\nTelefone: ${fields.phone}\nEndereço: ${fields.address}\nPaís: ${fields.country}`

    const customerMsg = `Pedidos de ${
      fields.name
    }:\n\n${orderMsg}\n\nValor Total: R$${total.toFixed(2)}\n\n${fieldsMsg}`

    // REDIRECT THE USER TO WHATSAPP WITH THE ORDER DETAILS
    const whatsappUrl = `https://wa.me/45991413098?text=${encodeURIComponent(
      customerMsg,
    )}`
    window.location.href = whatsappUrl
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4">
      {cart.length === 0 ? (
        <div className="flex h-[90vh] flex-col items-center justify-center gap-4">
          <BsCartX size={140} className="animate-bounce text-purple-800" />
          <p className="text-2xl">Você não tem pedidos.</p>
        </div>
      ) : (
        <>
          <div className="py-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-end justify-between border-b border-slate-50/20 p-4 hover:bg-slate-50/10"
              >
                <section className="flex gap-3">
                  <div className="max-h-[4rem] min-h-[4rem] min-w-[4rem] max-w-[4rem]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="h-full w-full rounded object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col justify-around text-xs md:text-sm">
                    <span>
                      {item.name} (Quantidade:{' '}
                      <span className="text-pink-400">{item.quantity}</span>)
                    </span>
                    <span className="text-pink-400">
                      <span className="text-slate-50"> Preço:</span> R${' '}
                      {item.price * item.quantity}
                    </span>
                  </div>
                </section>

                <div className="flex items-center gap-2">
                  <button
                    className="text-teal-400"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <CiSquarePlus size={28} />
                  </button>
                  <button
                    className="text-rose-400"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <CiSquareMinus size={28} />
                  </button>
                </div>
              </div>
            ))}

            <section className="my-16 rounded-xl bg-slate-800 p-4">
              <h2 className="mb-8 text-xl">Dados de Entrega</h2>
              <div className="flex flex-col gap-6 text-xs md:text-sm">
                <input
                  type="text"
                  className="rounded-sm bg-slate-50/10 px-2 py-2 outline-none hover:bg-slate-50/20"
                  placeholder="Nome completo"
                  value={fields.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name}</span>
                )}

                <input
                  type="tel"
                  className="rounded-sm bg-slate-50/10 px-2 py-2 outline-none hover:bg-slate-50/20"
                  placeholder="Telefone (WhatsApp)"
                  value={fields.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone}</span>
                )}

                <input
                  type="text"
                  className="rounded-sm bg-slate-50/10 px-2 py-2 outline-none hover:bg-slate-50/20"
                  placeholder="Endereço"
                  value={fields.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  onBlur={() => handleBlur('address')}
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address}</span>
                )}

                <input
                  type="text"
                  className="rounded-sm bg-slate-50/10 px-2 py-2 outline-none hover:bg-slate-50/20"
                  placeholder="País"
                  value={fields.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  onBlur={() => handleBlur('country')}
                />
                {errors.country && (
                  <span className="text-red-500">{errors.country}</span>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 py-8">
                <span className="text-base font-bold md:text-lg">
                  TOTAL: R$ {total.toFixed(2)}
                </span>
                <button
                  onClick={handleWhatsappOrderApp}
                  className="rounded bg-pink-400 px-8 py-2 text-sm text-slate-950"
                >
                  Solicitar
                </button>
              </div>
            </section>
          </div>
        </>
      )}
    </section>
  )
}

export default CartItems
