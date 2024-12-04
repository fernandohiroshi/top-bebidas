import Link from 'next/link'
import { GiShoppingCart } from 'react-icons/gi'

type ItemCountProps = {
  itemCount: number
}

const CartButton = ({ itemCount }: ItemCountProps) => {
  return (
    <Link
      href="/cart"
      className="flex items-start duration-300 ease-in-out hover:text-cyan-500"
    >
      <GiShoppingCart size={24} />
      <span className="text-xs">{itemCount}</span>
    </Link>
  )
}

export default CartButton
