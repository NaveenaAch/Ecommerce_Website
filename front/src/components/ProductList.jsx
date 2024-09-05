import { useEffect, useState } from "react"
import { ProductCard } from "./ProductCard"
import  http  from "../http"
import { Loading } from "./Loading"

export const ProductList = ({uri, title}) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setLoading(true)
        http.get(uri)
            .then(({data}) => setProducts(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return <div className="col-12">
    <div className="row">
        <div className="col-12 py-3">
            <div className="row">
                <div className="col-12 text-center text-uppercase">
                    <h2>{title}</h2>
                </div>
            </div>
            <div className="row row-cols-lg-4 row-cols-sm-2">

               {
                    loading ? 
                    <Loading /> : 
                    [...products].splice(0,4).map(product => 
                    <ProductCard key={product._id} product={product} isNew={uri == 
                    'product/latest'} />)
               }

              
            </div>
        </div>
    </div>
</div>
}

