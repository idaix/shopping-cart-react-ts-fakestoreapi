import { NavLink } from 'react-router-dom'
import { GiBearFace } from 'react-icons/gi'
import { RiShoppingCartLine } from 'react-icons/ri'
import { useShoppingCart } from '../context/ShoppingCartContext'
import Cart from './Cart'

const Navbar = () => {
  
  const { cartQuantity, handleClickCart, isOpen } = useShoppingCart()
  
  return (
    <nav className='shadow-sm px-3 bg-white sticky top-0 dark:bg-slate-900'>
      <div className="flex justify-between items-center h-11">
        <div className="flex-1 flex items-center justify-start">
        <NavLink className='text-blue-300 px-3 font-bold flex items-center' to={"/"}><GiBearFace className='mr-1'/>Savage</NavLink>
          <ul className="pl-3 flex items-center text-slate-500 dark:text-slate-50 italic">
            <li> <NavLink className='px-3 py-3 hover:bg-blue-50 duration-300' to={"/"}>Home</NavLink> </li>
            <li> <NavLink className='px-3 py-3 hover:bg-blue-50 duration-300' to={"/store"}>Store</NavLink> </li>
            <li> <NavLink className='px-3 py-3 hover:bg-blue-50 duration-300' to={"/about"}>About</NavLink>  </li>
          </ul>
        </div>
        <button onClick={handleClickCart} className="flex items-center  text-blue-300 hover:text-blue-500 duration-300">
          <RiShoppingCartLine />
          <span className='ml-1 text-xs italic'>"{cartQuantity}" items in cart</span>  
        </button>
      </div>
      {isOpen&&(
        <Cart />
      )}
    </nav>
  )
}

export default Navbar