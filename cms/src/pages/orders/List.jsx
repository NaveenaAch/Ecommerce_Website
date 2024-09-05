import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat } from "../../lib"

export const List = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/orders')
        .then(({data}) => setOrders(data))
        .catch(() => { })
        .finally(() => setLoading(false))


    const handleUpdate = (id, status) => {
        setLoading(true)
        http.patch(`cms/orders/${id}`, {status})
            .then(() => loadData())
            .catch(() => {})
            .finally(() => setLoading(false)) 
                    
    }

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { 
                        setLoading(true)
                        http.delete(`cms/orders/${id}`)
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
                    <h1>Orders</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['User', 'Details',
                        'Status', 'Created At', 'Updated At']} sortable={
                        ['User', 'Details', 'Status', 'Created At', 'Updated At']} data={orders.map(order => {
                            return {
                                'User': order.user[0].name,
                                'Details': <ul>
                                    {order.details.map(detail => <li key={detail._id}>
                                        {detail.qty} x {detail.product[0].name} @ Rs. 
                                        {detail.price} = Rs. {detail.total}
                                    </li>)}
                                </ul>,
                                'Status': <Form.Select value={order.status} onChange = {ev => 
                                handleUpdate(order._id, ev.target.value)}>
                                    <option value="Processing">Processing</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Shipping">Shipping</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </Form.Select>,
                                'Created At': dtFormat(order.createdAt),
                                'Updated At': dtFormat(order.updatedAt),
                                'Actions': 
                                    <Button type="button" variant="danger" size="sm" 
                                        title="Delete" onClick={() => handleDelete(order._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </Button>
                            }
                        })} /> }
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}