import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addToCart } from "../store"
import { isString } from "../lib"

export const CartBtn = ({product, qty = 1}) => {
    
    const[loading, setLoading] = useState(false)
    const cart = useSelector(st => st.cart.value)

    const dispatch = useDispatch()
    
    const handleClick = () => {
        setLoading(true)
        let temp = {...cart}

        if(Object.keys(cart).includes(product._id)){
            temp[product._id] = {
                qty: temp[product._id].qty + (isString(qty) ? parseInt(qty) : qty), 
                product
            }
        }else{
            temp[product._id] = {
                qty: isNaN(qty) ? parseInt(qty) : qty, 
                product
            }
        }

        dispatch(addToCart(temp))

        setLoading(false)
        toast.success(`Product ${product.name} added to cart.`)

    }
    
    return <>
        <button className="btn btn-outline-dark" type="button" disabled=
        {loading} onClick={handleClick}>
            <i className={`fas ${loading ? 'fa-spinner fa-spin' : 
            'fa-cart-plus'} me-2`}></i>Add to cart
        </button>
    </>
}

