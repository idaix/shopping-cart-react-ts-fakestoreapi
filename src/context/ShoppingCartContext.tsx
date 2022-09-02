import { createContext, ReactNode, useContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

// Create Shopping Cart Context
const ShoppingCartContext = createContext({} as ShoppingCartContext)
// Usage
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}
// ============= Define types =================
type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    handleClickCart: () => void
    getItemsQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    isOpen: boolean
}




// Create Provider For Our Shopping Cart

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [ cartItems, setCartItems ] = useLocalStorage<CartItem[]>("shopping-cart", [])
    const [ isOpen, setIsOpen ] = useState(false)
    // Create Cart Methods
    const handleClickCart = () => {
        setIsOpen(prevState => !prevState)
    }
    const getItemsQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    const increaseCartQuantity = (id: number) => {
        setCartItems(currentItems => {
            // if we item do not exist in cartItems ...
            if (cartItems.find(item => item.id === id) == null) {
                // add item to cart 
                return [...currentItems, { id, quantity: 1 }]
            }else {
                return currentItems.map(item => {
                    if (item.id === id){
                        return { ...item, quantity: item.quantity + 1 }
                    }else{
                        return item
                    }
                })
            }
        })
        setIsOpen(true)
    }
    const decreaseCartQuantity = (id: number) => {
        setCartItems(currentItems => {
            // if quantity === 1 remove the item
            if (currentItems.find(item=>item.id === id)?.quantity === 1){
                return currentItems.filter(item => item.id !== id)
            }else{
                return currentItems.map(item => {
                    if (item.id === id){
                        return { ...item, quantity: item.quantity - 1 }
                    }else{return item}
                })
            }
        })
    }
    const removeFromCart = (id: number) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id != id)
        })
    }

    
    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity , 0)
    
    return (
        <ShoppingCartContext.Provider
            value={{
                cartItems,
                getItemsQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartQuantity,
                isOpen,
                handleClickCart
            }}
        >
            { children }
        </ShoppingCartContext.Provider>
    )
}