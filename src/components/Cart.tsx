import { useShoppingCart } from '../context/ShoppingCartContext'
import CartCard from './CartCard'
import storeItems from '../data/data.json'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRegSadCry } from 'react-icons/fa'
import { BiHappyHeartEyes } from 'react-icons/bi'
import { formatCurrency } from '../utilities/formateCurrency'

const Cart = () => {
    const { cartItems, handleClickCart } = useShoppingCart()
  return (
    <div className='fixed w-3/4 top-0 h-full left-0 bg-white shadow-2xl p-3 z-50 overflow-auto'>
      <button onClick={handleClickCart} className='absolute top-3 right-3'><AiOutlineCloseCircle /></button>
      <h1 className="text-center text-xl font-semibold italic mb-2 text-blue-300">Cart</h1>
      <hr />
      {cartItems.length == 0 ?(
        <>
          <p className='text-center text-slate-500 mt-4 flex items-center justify-center'>Your cart is empty <FaRegSadCry className='ml-2' /></p>
          <div><button onClick={handleClickCart} className='text-center mx-auto mt-4 flex items-center justify-center text-blue-300 bg-blue-50 px-4 py-1 rounded-lg hover:shadow-sm hover:bg-white duration-300'>Add some <BiHappyHeartEyes className='ml-2' /></button></div>
        </>
      ):
      (
        <>
          <div className="mt-3 grid">
          {
            cartItems.map(item=>(
              <CartCard {...item} key={item.id}/>
            ))
          }
        </div>
        <strong className="float-left text-green-700">
          Total: {formatCurrency(
            cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i=> i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
            }, 0)
          )} 
        </strong>
        <button className="py-1 float-right px-3 rounded bg-blue-50 text-blue-400 hover:shadow-sm hover:bg-white duration-300 font-semibold">Checkout</button>
        </>
      )}
      
    </div>
  )
}

export default Cart