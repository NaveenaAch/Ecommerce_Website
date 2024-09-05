import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./Layout.css"
import "bootstrap"
import { Link, Outlet } from "react-router-dom"
import { NavBar } from "./NavBar"
import { SearchBox } from "./"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, fromStorage, isEmpty, isString } from "../lib"
import { clearUser, setUser } from "../store"
import { useEffect, useState } from "react"
import http from "../http"

export const Layout = () => {

    const [qty, setQty] = useState(0)
    const [total, setTotal] = useState(0)

    const user = useSelector(st => st.user.value)
    const cart = useSelector(st => st.cart.value)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isEmpty(user)){
            const token = fromStorage('user_token')

            if(!isEmpty(token)) {
                http.get('profile/details')
                    .then(({data}) => {
                        dispatch(setUser(data))
                    })
                    .catch(err => {
                        clearStorage('user_token')
                    })
            }
        }
    }, [user])

    useEffect(() => {
        if(Object.keys(cart).length){
            let qt = 0, tl = 0

            for(let k in cart){
                qt += isString(cart[k].qty) ? parseInt(cart[k].qty) : cart[k].qty
                tl += cart[k].qty * (isEmpty(cart[k].product.
                discounted_price) ? cart[k].product.price : cart[k].product.
                discounted_price)
            }

            setQty(qt)
            setTotal(tl)
        }else{
            setQty(0)
            setTotal(0)
        }
    }, [cart])

    const handleLogout = (ev) => {
        ev.preventDefault()
        
        dispatch(clearUser())
        clearStorage('user_token')
    }

    return <div className="container-fluid">

        <div className="row min-vh-100">
            <div className="col-12">
                <header className="row">
                    <div className="col-12 bg-dark py-2 d-md-block d-none">
                        <div className="row">
                            <div className="col-auto me-auto">
                                <ul className="top-nav">
                                    <li>
                                        <a href="tel:+123-456-7890"><i className="fa fa-phone-square me-2"></i>+123-456-7890</a>
                                    </li>
                                    <li>
                                        <a href="mailto:mail@ecom.com"><i className="fa fa-envelope me-2"></i>mail@ecom.com</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-auto">
                                {isEmpty(user) ? 
                                <ul className="top-nav">
                                    <li>
                                        <Link to="/register"><i className="fas fa-user-edit me-2"></i>Register</Link>
                                    </li>
                                    <li>
                                        <Link to="/login"><i className="fas fa-sign-in-alt me-2"></i>Login</Link>
                                    </li>
                                </ul>: 
                                <ul className="top-nav">
                                    <li>
                                        <Link to="/profile"><i className="fas fa-user-circle me-2"></i>{user.name}</Link>
                                    </li>
                                    <li>
                                        <a href="#" onClick={handleLogout}><i className="fas fa-sign-in-alt me-2"></i>Logout</a>
                                    </li>
                                </ul>}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 bg-white pt-4">
                        <div className="row">
                            <div className="col-lg-auto">
                                <div className="site-logo text-center text-lg-left">
                                    <Link to="/">Zen SportX</Link>
                                </div>
                            </div>
                            <div className="col-lg-5 mx-auto mt-4 mt-lg-0">
                                <SearchBox />   
                            </div>
                            <div className="col-lg-auto text-center text-lg-left header-item-holder">
                                <a href="#" className="header-item">
                                    <i className="fas fa-heart me-2"></i><span id="header-favorite">0</span>
                                </a>
                                <Link to="/cart" className="header-item">
                                    <i className="fas fa-shopping-bag me-2">
                                        </i><span id="header-qty" className="me-3">
                                            {qty}</span>
                                    <i className="fas fa-money-bill-wave me-2"></i><span id="header-price">Rs. {total}</span>
                                </Link>
                            </div>
                        </div>

                        <NavBar />

                    </div>

                </header>
            </div>

            <Outlet />

            <div className="col-12 align-self-end">
                <footer className="row">
                    <div className="col-12 bg-dark text-white pb-3 pt-5">
                        <div className="row">
                            <div className="col-lg-2 col-sm-4 text-center text-sm-left mb-sm-0 mb-3">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="footer-logo">
                                            <a href="index.html">Zen SportX</a>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <address>
                                            Kathmandu, Nepal
                                        </address>
                                    </div>
                                    <div className="col-12">
                                        <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                                        <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                                        <a href="#" className="social-icon"><i className="fab fa-pinterest-p"></i></a>
                                        <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                                        <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-8 text-center text-sm-left mb-sm-0 mb-3">
                                <div className="row">
                                    <div className="col-12 text-uppercase">
                                        <h4>About</h4>
                                    </div>
                                    <div className="col-12 text-justify">
                                        <p>Welcome to Zen SportX, your premier destination for high-quality sports products and gear. At Zen SportX, we are dedicated to fueling your passion for sports and helping you achieve your athletic goals.Follow us on social media for the latest updates, exclusive promotions, and inspirational content. Share your journey with us and connect with fellow sports enthusiasts who share your passion.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-3 col-5 ms-lg-auto ms-sm-0 ms-auto mb-sm-0 mb-3">
                                <div className="row">
                                    <div className="col-12 text-uppercase">
                                        <h4>Quick Links</h4>
                                    </div>
                                    <div className="col-12">
                                        <ul className="footer-nav">
                                            <li>
                                                <a href="#">Home</a>
                                            </li>
                                            <li>
                                                <a href="#">Contact Us</a>
                                            </li>
                                            <li>
                                                <a href="#">About Us</a>
                                            </li>
                                            <li>
                                                <a href="#">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="#">Terms & Conditions</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-1 col-sm-2 col-4 me-auto mb-sm-0 mb-3">
                                <div className="row">
                                    <div className="col-12 text-uppercase text-underline">
                                        <h4>Help</h4>
                                    </div>
                                    <div className="col-12">
                                        <ul className="footer-nav">
                                            <li>
                                                <a href="#">FAQs</a>
                                            </li>
                                            <li>
                                                <a href="#">Shipping</a>
                                            </li>
                                            <li>
                                                <a href="#">Returns</a>
                                            </li>
                                            <li>
                                                <a href="#">Track Order</a>
                                            </li>
                                            <li>
                                                <a href="#">Report Fraud</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 text-center text-sm-left">
                                <div className="row">
                                    <div className="col-12 text-uppercase">
                                        <h4>Newsletter</h4>
                                    </div>
                                    <div className="col-12">
                                        <form action="#">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" placeholder="Enter your email..." required />
                                            </div>
                                            <div className="mb-3">
                                                <button className="btn btn-outline-light text-uppercase">Subscribe</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>

    </div>
}