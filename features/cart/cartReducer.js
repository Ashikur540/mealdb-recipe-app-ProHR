
export const cartActionTypes = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    INITIALIZE_CART: "INITIALIZE_CART"
}


// cart item  {id,image,name}

export const initialCartState = {
    cart: []
}

export const cartReducer = (state = initialCartState, action) => {

    switch (action.type) {
        case cartActionTypes.INITIALIZE_CART: {
            const localCart = JSON.parse(localStorage.getItem("meal-cart")) ?? []
            return { ...state, cart: localCart }
        }
        case cartActionTypes.ADD_TO_CART: {
            const updatedCart = [
                ...state?.cart,
                action.payload
            ]
            localStorage.setItem("meal-cart", JSON.stringify(updatedCart))
            return { ...state, cart: updatedCart }
        }
        case cartActionTypes.REMOVE_FROM_CART: {
            const filteredCart = state.cart.filter((item) => item.idMeal !== action.payload.id)
            localStorage.setItem("meal-cart", JSON.stringify(filteredCart))
            return { ...state, cart: filteredCart }
        }
        default:
            return state
    }
}



