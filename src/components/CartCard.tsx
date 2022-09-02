import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formateCurrency"
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import storeItem from '../data/data.json'
type cartItemsType = {
    id: number
    quantity: number
    
}
const CartCard = ({ id , quantity }: cartItemsType) => {
  
    const item = storeItem.find(i => i.id === id)
    if (item == null){return null}
  const {removeFromCart, increaseCartQuantity, decreaseCartQuantity} = useShoppingCart()
    return (
    <div className='mb-2 bg-slate-50 p-1 flex items-center'>        
        <figure className="rounded overflow-hidden w-11 h-11">
          <img className='rounded h-full w-full' src={item.image} alt={item.title} />
        </figure>
        <div className="flex-1 pl-3">
          <h3 className="text-sm text-slate-600 font-semibold">{item.title}</h3>
          <span className='text-xs text-slate-500'>{formatCurrency(item.price)}</span>
        </div>
        <div className="flex bg-slate-100 text-slate-500 items-center rounded-lg mr-2">
          <button className='py-1 px-3' onClick={()=>increaseCartQuantity(id)}><IoIosAddCircleOutline/></button>
          <span className='py-1 px-3'>{quantity}</span>
          <button className='py-1 px-3' onClick={()=>decreaseCartQuantity(id)}><IoIosRemoveCircleOutline/></button>
        </div>
        <button className='bg-slate-100 text-slate-500 p-2 rounded-lg' onClick={()=>removeFromCart(id)}><MdDelete /></button>

    </div>
  )
}

export default CartCard