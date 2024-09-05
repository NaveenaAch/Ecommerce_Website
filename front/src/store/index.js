import { configureStore } from "@reduxjs/toolkit"
import userReducer, { setUser, clearUser } from "./userSlice"
import cartReducer, { addToCart, clearCart } from "./cartSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    }
})

export { setUser, clearUser, addToCart, clearCart }