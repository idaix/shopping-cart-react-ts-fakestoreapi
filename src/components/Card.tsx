import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formateCurrency'


type ProductProps = {
    id: number
    title:string
    price: number
    image:string
}
const Card = ({ id, title, price, image }: ProductProps) => {
  
    const { increaseCartQuantity } = useShoppingCart()
    return (
        <div className="bg-white rounded shadow-sm">
                <img src={image} alt={title} className="h-60 rounded-t"/>
                <div className="p-3 flex flex-col justify-between">
                    <h2 className="title text-sm font-semibold">{title}</h2>
                    <div className="flex items-center justify-between mt-auto">
                        <p className='text-green-600 text-xs font-bold'>{formatCurrency(price)}</p>
                        <button onClick={()=>increaseCartQuantity(id)} className='py-1 px-4 rounded bg-blue-50 text-blue-400 hover:bg-white duration-300'>Add to cart</button>
                    </div>
                </div>
        </div>
  )
}

export default Card