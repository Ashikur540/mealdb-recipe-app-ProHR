"use client"

import { cartReducer, initialCartState } from "@/features/cart/cartReducer"
import { createContext, useContext, useEffect, useReducer, useState } from "react"


export const cartContext = createContext(null)

export const CartProvider = ({ children }) => {
    const [initialState, setInitialState] = useState(initialCartState);
    const [cartState, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        const localCart = localStorage.getItem("meal-cart") ?? [];
        if (localCart) {
            setInitialState({ cart: JSON.parse(localCart) });
        }
    }, [])

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