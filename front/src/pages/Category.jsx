import { useEffect, useState } from "react"
import http from "../http"
import { useParams } from "react-router-dom"
import { Loading, ProductCard } from "../components"
import { PageItem, Pagination } from "react-bootstrap"

export const Category = () => {
    
    
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [perPage, setPerPage] = useState(18)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [offset, setOffset] = useState(0)
    const [pageLinks, setPageLinks] = useState([])

    const params = useParams()

    useEffect(() => {
        loadData()
    }, [params.id])

    useEffect(() => {
        let paginated = [...products].splice(offset, perPage)

        setItems(paginated)
    }, [products, offset])

    useEffect(() => {
        setCurrentPage(1)

        let paginated = [...products].splice(offset, perPage)

        let total = Math.ceil(products.length / perPage)

        setItems(paginated)
        setTotalPages(total)
    }, [perPage, products])

    useEffect(() => {
        let start = (currentPage - 1) * perPage

        setOffset(start)
    }, [currentPage])

    useEffect(() => {
        let links = [<Pagination.Prev disabled={currentPage == 1} onClick={() => setCurrentPage(currentPage - 1)} />]

        for(let i = 1; i <= totalPages; i++) {
            links.push(<PageItem active={i == currentPage} onClick={ev => {
                ev.preventDefault()
                setCurrentPage(i)
            }}>{i}</PageItem>)
        }

        links.push(<Pagination.Next disabled={currentPage == totalPages} onClick={() => setCurrentPage(currentPage + 1)} />)

        setPageLinks(links)
    }, [totalPages, currentPage])


    const loadData = async() => {
        setLoading(true)

        try{
            let catResp = await http.get(`category/${params.id}`)
            setCategory(catResp.data)
            let proResp = await http.get(`category/${params.id}/products`)
            setProducts(proResp.data)
            setCurrentPage(1)
        }catch(e){} finally{
            setLoading(false)
        }
    }
    
    return loading ? <Loading />: <div className="col-12">
    <main className="row">

        <div className="col-12">
            <div className="row">
                <div className="col-12 py-3">
                    <div className="row">
                        <div className="col-12 text-center text-uppercase">
                            <h2>{category.name}</h2>
                        </div>
                    </div>
                    <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-sm-2">

                        {items.map(product => <ProductCard product={product} key=
                        {product._id} />)}
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12">
            {totalPages > 1 ? <Pagination className="justify-content-center">
                {pageLinks}
            </Pagination> : null}
        </div>

    </main>
    </div>
           
}