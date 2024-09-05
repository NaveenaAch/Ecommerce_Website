import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat } from "../../lib"

export const List = () => {

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/reviews')
        .then(({data}) => setReviews(data))
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
                        http.delete(`cms/reviews/${id}`)
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
                    <h1>Reviews</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['User', 'Product', 
                        'Comment', 'Rating', 'Created At', 'Updated At']} sortable={
                        ['User', 'Product', 'Comment', 'Rating', 'Created At', 'Updated At']} data={reviews.map(review => {
                            return {
                                'User': review.user[0].name,
                                'Product': review.product[0].name,
                                'Comment': review.comment,
                                'Rating': review.rating,
                                'Created At': dtFormat(review.createdAt),
                                'Updated At': dtFormat(review.updatedAt),
                                'Actions': 
                                    <Button type="button" variant="danger" size="sm" 
                                        title="Delete" onClick={() => handleDelete(review._id)}>
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