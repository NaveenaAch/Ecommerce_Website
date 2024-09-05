import { Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { SubmitButton } from "../../components"
import { setInState } from "../../lib"
import { useState } from "react"
import http from "../../http"

export const create = () => {

    const [form, setForm] = useState({status: 'true'})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('cms/customers', form)
            .then(() => {
                navigate('/customers')
            })
            .catch(() =>{})
            .finally(() => setLoading(false))
    }

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="6" className="mx-auto">
                    <h1>Add Customer</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="6" className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control name="name" id="name" 
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control name="email" id="email" onChange={ev => 
                            setInState(ev, form, setForm)} required/>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" name="password" 
                            id="password"onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="confirm_password">Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirm_password" 
                            id="confirm_password"onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control name="phone" id="phone" 
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="address">Address</Form.Label>
                            <Form.Control name="address" id="address" 
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


                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}