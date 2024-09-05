import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../http"

export const NavBar = () => {

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    useEffect(() => {
        http.get('category')
            .then(({data}) => setCategories(data))
            .catch(err => {})
    

        http.get('brand')
            .then(({data}) => setBrands(data))
            .catch(err => {})
    }, [])

    return <div className="row">
    <nav className="navbar navbar-expand-lg navbar-light bg-white col-12">
        <button className="navbar-toggler d-lg-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="categories" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories</a>
                    <div className="dropdown-menu" aria-labelledby="categories">
                       {categories.map(category => <Link key={category._id}
                       className="dropdown-item" to={`category/${category._id}`}>
                        {category.name}</Link>)}
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="brands" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Brands</a>
                    <div className="dropdown-menu" aria-labelledby="brands">
                    {brands.map(brand => <Link key={brand._id}
                       className="dropdown-item" to={`brand/${brand._id}`}>
                        {brand.name}</Link>)}

                    </div>
                </li>
                
            </ul>
        </div>
    </nav>
</div>
}