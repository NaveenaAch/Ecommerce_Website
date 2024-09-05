import axios from "axios"
import { toast } from "react-toastify"
import { empty, fromStorage } from "../lib"

const http = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    baseURL: import.meta.env.VITE_API_URL
})

http.interceptors.response.use(response => {
    if(response.data.hasOwnProperty('success')) {
        toast.success(response.data.success)
    }

    return response
}, err => {
    if (err.response.data.hasOwnProperty('message')) {
        toast.error(err.response.data.message)
    }

    return Promise.reject(err)
})

http.interceptors.request.use(config => {
    const token = fromStorage('user_token')

    if(!empty(token)) {
        config.headers = {
            ...config.headers,
            "Authorization": `Bearer ${token}`
        }
    }

    return config
}, err => Promise.reject(err))

export default http