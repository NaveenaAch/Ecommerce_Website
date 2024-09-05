import { useEffect, useState } from "react"
import{ useDispatch, useSelector } from "react-redux"
import { imgUrl, isEmpty } from "../lib"
import { addToCart, clearCart } from "../store"
import { toast } from "react-toastify"
import http from "../http"
import { useNavigate } from "react-router-dom"

export const Cart = () => {
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    const user = useSelector(st => st.user.value)
    const cart = useSelector(st => st.cart.value)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(Object.keys(cart).length){
            let tl = 0

            for(let k in cart){
                tl += cart[k].qty * (isEmpty(cart[k].product.
                discounted_price) ? cart[k].product.price : cart[k].product.
                discounted_price)
            }

            setTotal(tl)
        }
    }, [cart])

    const handleEmptyCart = () => {
        dispatch(clearCart())

        toast.success('Cart is empty.')
    }

    const handleQtyChange = (value, id) => {
        let newCart = {}

        for(let k in cart) {
           newCart = {
                ...newCart,
                [k]: {
                    qty: k == id ? value : cart[k].qty,
                    product : cart[k].product
                }
           }
        }

        if(Object.keys(newCart).length){
            dispatch(addToCart(newCart))
        } else{
            dispatch(clearCart())
        }

        toast.success('Cart updated.')
    }

    const handleRemove = (id) => {
        let newCart = {}

        for(let k in cart) {
           if(k != id){
            newCart = {
                ...newCart,
                [k]: {
                    qty: cart[k].qty,
                    product : cart[k].product
                }
           }
           }
        }

        dispatch(addToCart(newCart))

        toast.success('Cart updated.')
    }


    const handleCheckout = () => {
        setLoading(true)

        let data = []

        for(let id in cart) {
            let price = isEmpty(cart[id].product.
                discounted_price) ? cart[id].product.price : cart[id].product.
                discounted_price

            data.push({
                product_id: id,
                price,
                qty: cart[id].qty,
                total: cart[id].qty * price,
            })
        }

        http.post('checkout', data)
            .then(() => {
                dispatch(addToCart(newCart))
                navigate('/')
            })
            .catch(err => {
                if('response' in err && err.response.status == 401){
                    navigate('/login')
                }
            })
            .finally(() => setLoading(false))
    }

    return <div className="col-12">
    <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
            <h2>Shopping Cart</h2>
        </div>
    </div>

    <main className="row">
        <div className="col-12 bg-white py-3 mb-3">
            <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-10 mx-auto table-responsive">
                    {
                        Object.keys(cart).length ? 
                        <form className="row">
                        <div className="col-12">
                            <table className="table table-striped table-hover table-sm">
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(cart).map(id =>
                                <tr key={id}>
                                    <td>
                                        <img src={imgUrl(cart
                                        [id].product.images
                                        [0])} 
                                        className="img-fluid me-2" />
                                        {cart[id].product.name}
                                    </td>
                                    <td>
                                        Rs {isEmpty(cart[id].
                                            product.
                                            discounted_price) ?
                                            cart[id].product.price
                                            : cart[id].product.
                                            discounted_price}
                                    </td>
                                    <td>
                                        <input type="number" min="1" defaultValue={cart
                                        [id].qty} onChange={ev => handleQtyChange(ev.target.value, id)}/>
                                    </td>
                                    <td>
                                    Rs {(isEmpty(cart[id].
                                            product.
                                            discounted_price) ?
                                            cart[id].product.price
                                            : cart[id].product.
                                            discounted_price) * 
                                            cart[id].qty}
                                    </td>
                                    <td>
                                        <button className="btn 
                                        btn-link text-danger"
                                        type="button" onClick=
                                        {() => handleRemove(id)}
                                        ><i className="fas 
                                        fa-times"></i></button>
                                    </td>
                                </tr>)}
                              
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th colSpan="3" className="text-right">Total</th>
                                    <th>Rs. {total}</th>
                                    <th></th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="col-12 text-right">
                            <button className="btn btn-outline-secondary me-3" type="button" onClick={handleEmptyCart}>Empty Cart</button>
                            <button type="button" className="btn btn-outline-success" onClick={handleCheckout} 
                            disabled={loading}>{loading ? <i className="fa-solid fa-spinner fa-spin me-2"></i> : null } Checkout</button>
                        </div>
                    </form> :
                    <h4 className="text-muted text-center
                    fst-italic">Shopping Cart is empty</h4>
                    }
                </div>
            </div>
        </div>

    </main>
</div>
}