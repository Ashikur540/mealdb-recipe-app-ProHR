"use client"

import { cartActionTypes, cartReducer, initialCartState } from "@/features/cart/cartReducer"
import { createContext, useContext, useEffect, useReducer, useState } from "react"


export const cartContext = createContext(null)

export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

    useEffect(() => {
        // initialize cart by local storage 
        dispatch({ type: cartActionTypes.INITIALIZE_CART })
    }, [])

    useEffect(() => {
        console.log("Cart state", cartState);
    }, [cartState])

    return (
        <cartContext.Provider value={{ cartState, dispatch }}>
            {children}
        </cartContext.Provider>
    )

}


export const useCartContext = () => {
    const context = useContext(cartContext)
    return context
}