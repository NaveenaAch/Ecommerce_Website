import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat } from "../../lib"

export const List = () => {

    const [staffs, setStaffs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/staffs')
        .then(({data}) => setStaffs(data))
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
                        http.delete(`cms/staffs/${id}`)
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
                    <h1>Staffs</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/staffs/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus me-2"></i>Add Staff
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['Name', 'Email', 'Phone',
                    'Address', 'Status', 'Created At', 'Updated At']} sortable={
                        ['Name', 'Email', 'Phone', 'Address', 'Status', 'Created At', 'Updated At']} data={staffs.map(staff => {
                            return {
                                'Name': staff.name,
                                'Email': staff.email,
                                'Phone': staff.phone,
                                'Address': staff.address,
                                'Status': staff.status ? 'Active' : 'Inactive',
                                'Created At': dtFormat(staff.createdAt),
                                'Updated At': dtFormat(staff.updatedAt),
                                'Actions': <>
                                    <Link to={`/staffs/${staff._id}/edit`} className="btn 
                                    btn-dark btn-sm me-2" title="Edit">
                                        <i className="fa-solid fa-edit"></i>
                                    </Link>
                                    <Button type="button" variant="danger" size="sm" 
                                    title="Delete" onClick={() => handleDelete(staff._id)}>
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