import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat } from "../../lib"

export const List = () => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/categories')
        .then(({data}) => setCategories(data))
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
                        http.delete(`cms/categories/${id}`)
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

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col>
                    <h1>Categories</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/categories/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus me-2"></i>Add Category
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['Name', 'Slug', 'Status', 
                        'Created At', 'Updated At']} sortable={
                        ['Name', 'Slug', 'Status', 'Created At', 'Updated At']} data={categories.map(category => {
                            return {
                                'Name': category.name,
                                'Slug': category.slug,
                                'Status': category.status ? 'Active' : 'Inactive',
                                'Created At': dtFormat(category.createdAt),
                                'Updated At': dtFormat(category.updatedAt),
                                'Actions': <>
                                    <Link to={`/categories/${category._id}/edit`} className="btn 
                                    btn-dark btn-sm me-2" title="Edit">
                                        <i className="fa-solid fa-edit"></i>
                                    </Link>
                                    <Button type="button" variant="danger" size="sm" 
                                    title="Delete" onClick={() => handleDelete(category._id)}>
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