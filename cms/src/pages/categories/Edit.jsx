import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { empty, setInState } from "../../lib"
import http  from "../../http"
import { Loading, SubmitButton } from "../../components"
import { useNavigate, useParams } from "react-router-dom"
import slugify from "slugify"

export const Edit = () => {

    const [form, setForm] = useState({})
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)
        http.get(`cms/categories/${params.id}`)
            .then(({data}) => setCategory(data))
            .catch(() => {})
            .finally(() => setLoadingPage(false))
    }, [])

    useEffect(() => {
        if (!empty(category)){
            setForm({
                name: category.name,
                slug: category.slug,
                status: category.status
            })
        }
    }, [category])

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

        http.patch(`cms/categories/${params.id}`, form)
            .then(() => navigate('/categories'))
            .catch(() =>{})
            .finally(() => setLoading(false))
    }

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="6" className="mx-auto">
                    <h1>Edit Category</h1>
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
                            <Form.Label htmlFor="slug">Slug</Form.Label>
                            <Form.Control slug="slug" id="slug" defaultValue={form.slug}
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
