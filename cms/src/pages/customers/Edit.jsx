import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { empty, setInState } from "../../lib"
import http  from "../../http"
import { Loading, SubmitButton } from "../../components"
import { useNavigate, useParams } from "react-router-dom"

export const Edit = () => {

    const [form, setForm] = useState({})
    const [customer, setCustomer] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)
        http.get(`cms/customers/${params.id}`)
            .then(({data}) => setCustomer(data))
            .catch(() => {})
            .finally(() => setLoadingPage(false))
    }, [])

    useEffect(() => {
        if (!empty(customer)){
            setForm({
                name: customer.name,
                phone: customer.phone,
                address: customer.address,
                status: customer.status
            })
        }
    }, [customer])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch(`cms/customers/${params.id}`, form)
            .then(() => navigate('/customers'))
            .catch(() =>{})
            .finally(() => setLoading(false))
    }

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="6" className="mx-auto">
                    <h1>Edit Customer</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="6" className="mx-auto">
                    {loadingPage ? <Loading /> : <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control name="name" id="name" defaultValue={form.name}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control name="email" id="email" defaultValue={customer?.email}
                            readOnly plaintext/>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control name="phone" id="phone" defaultValue={form.phone}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="address">Address</Form.Label>
                            <Form.Control name="address" id="address" defaultValue={form.address}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="status">Status</Form.Label>
                            <Form.Select name="status" id="status" 
                            onChange={ev => setInState(ev, form, setForm)} value={form.status} required>
                                <option value="true" >Active</option>
                                <option value="false" >Inactive</option>
                            </Form.Select>

                        </div>
                        <div className="mb-3">
                            <SubmitButton loading={loading} icon="fa-save" 
                            label="Save" />  
                        </div>
                    </Form>}
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}
