import { cartActionTypes } from "./cartReducer";




export const addToCart = (recipe) => {

    return {
        type: cartActionTypes.ADD_TO_CART,
        payload: recipe,
    };
};
export const removeFromCart = (id) => {
    // console.log("✨ ~ addNewPixel ~ pixel:", pixel);
    return {
        type: cartActionTypes.REMOVE_FROM_CART,
        payload: id,
    };
};