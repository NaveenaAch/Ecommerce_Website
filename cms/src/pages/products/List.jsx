import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat, imgUrl } from "../../lib"

export const List = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/products')
        .then(({data}) => setProducts(data))
        .catch(() => { })
        .finally(() => setLoading(false))

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { 
                        setLoading(true)
                        http.delete(`cms/products/${id}`)
                            .then(() => loadData())
                            .catch(() => {})
                            .finally(() => setLoading(false)) 
                    }
                },
                {
                    label:'No',
                    onClick: () => { }
                }
            ]
        })
    }

    return <Container fluid className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/products/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus me-2"></i>Add Product
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['Name', 'Slug', 'Status', 
                        'Created At', 'Updated At', 'Price', 'Dis. Price',
                    'Category', 'Brand', 'Featured']} sortable={
                        ['Name', 'Slug', 'Status', 'Created At', 'Updated At', 'Price', 'Dis. Price',
                        'Category', 'Brand', 'Featured']} data={products.map(product => {
                            return {
                                'Name': product.name,
                                'Slug': product.slug,
                                'Image':<a href={imgUrl(product.images.at(0))} 
                                 target= "_blank">
                                        <img src={imgUrl(product.images.at(0))}  
                                        className="img-small" id="product-list" />
                                    </a>,
                                'Price': product.price,
                                'Dis. Price': product.discounted_price,
                                'Category': product.category[0].name,
                                'Brand': product.brand[0].name,
                                'Featured': product.featured ? 'Yes' : 'No',
                                'Status': product.status ? 'Active' : 'Inactive',
                                'Created At': dtFormat(product.createdAt),
                                'Updated At': dtFormat(product.updatedAt),
                                'Actions': <>
                                    <Link to={`/products/${product._id}/edit`} className="btn 
                                    btn-dark btn-sm me-2" title="Edit">
                                        <i className="fa-solid fa-edit"></i>
                                    </Link>
                                    <Button type="button" variant="danger" size="sm" 
                                    title="Delete" onClick={() => handleDelete(product._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </Button>
                                </>
                            }
                        })} /> }
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}