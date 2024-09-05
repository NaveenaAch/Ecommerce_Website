import { createSlice } from "@reduxjs/toolkit";
import { clearStorage, fromStorage, intoStorage } from "../lib";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: JSON.parse(fromStorage('cart') ?? '{}')
    },
    reducers: {
        addToCart: (state, action) => {
            state.value = action.payload
            intoStorage('cart',JSON.stringify(action.payload), true)
        },
        clearCart: state => {
            state.value = {}
            clearStorage('cart')
        },
    },
})

export default cartSlice.reducer
export const {addToCart, clearCart} = cartSlice.actions