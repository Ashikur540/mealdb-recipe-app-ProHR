"use client"

import { cartReducer, initialCartState } from "@/features/cart/cartReducer"
import { createContext, useContext, useReducer } from "react"


export const cartContext = createContext(null)

export const CartProvider = ({ children }) => {

    const [cartState, dispatch] = useReducer(cartReducer, initialCartState)

    return (
        <cartContext.Provider value={{ cartState, dispatch }}>
            {children}
        </cartContext.Provider>
    )

}


export const useCartContext=()=>{
    const context= useContext(cartContext)
    return context
}