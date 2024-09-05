import { Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { SubmitButton } from "../../components"
import { setInState } from "../../lib"
import { useEffect, useState } from "react"
import http from "../../http"
import slugify from "slugify"

export const create = () => {

    const [form, setForm] = useState({status: 'true'})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(form && form.name && form.name.length){
            const slug = slugify(form.name, {lower: true, remove: /[*+~.()'"!:@]/g })
            setForm({
                ...form,
                slug
            })
        }
    }, [form.name])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('cms/categories', form)
            .then(() => {
                navigate('/categories')
            })
            .catch(() =>{})
            .finally(() => setLoading(false))
    }

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="6" className="mx-auto">
                    <h1>Add Category</h1>
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
                            <Form.Label htmlFor="slug">Slug</Form.Label>
                            <Form.Control name="slug" id="slug" value={form?.slug}
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