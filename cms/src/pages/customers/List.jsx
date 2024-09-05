import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat } from "../../lib"

export const List = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/customers')
        .then(({data}) => setCustomers(data))
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
                        http.delete(`cms/customers/${id}`)
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
                    <h1>Customers</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/customers/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus me-2"></i>Add Customer
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['Name', 'Email', 'Phone',
                    'Address', 'Status', 'Created At', 'Updated At']} sortable={
                        ['Name', 'Email', 'Phone', 'Address', 'Status', 'Created At', 'Updated At']} data={customers.map(customer => {
                            return {
                                'Name': customer.name,
                                'Email': customer.email,
                                'Phone': customer.phone,
                                'Address': customer.address,
                                'Status': customer.status ? 'Active' : 'Inactive',
                                'Created At': dtFormat(customer.createdAt),
                                'Updated At': dtFormat(customer.updatedAt),
                                'Actions': <>
                                    <Link to={`/customers/${customer._id}/edit`} className="btn 
                                    btn-dark btn-sm me-2" title="Edit">
                                        <i className="fa-solid fa-edit"></i>
                                    </Link>
                                    <Button type="button" variant="danger" size="sm" 
                                    title="Delete" onClick={() => handleDelete(customer._id)}>
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