import { configureStore } from "@reduxjs/toolkit"
import userReducer, { setUser, clearUser } from "./userSlice"

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export { setUser, clearUser }
