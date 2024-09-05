import { useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { intoStorage, setInState } from "../../lib"
import { SubmitButton } from "../../components"
import http from "../../http"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../store"
import { toast } from "react-toastify"

export const Login = () => {

    const [form, setForm] = useState({})
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('login', form)
            .then(({data}) => {
                if(['Admin', 'Staff'].includes(data.user.type)){
                    intoStorage('cms_token', data.token, remember)
                    dispatch(setUser(data.user))
                }else{
                    toast.error('Access denied')
                }

                navigate('/')
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <Container>
    <Row>
        <Col lg="4" md="6" sm="10" className="bg-white my-5 py-3 rounded-2 
        shadow-sm mx-auto">
            <Row>
                <Col xs="12" className="text-center">
                    <h1>Login</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control type="email" name="email" id="email"
                            onChange={ev => setInState(ev, form, setForm)} required />
                        </div>
                    
                        <div className="mb-3">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" name="password" id="password"
                            onChange={ev => setInState(ev, form, setForm)} required />
                        </div>
                        <div className="mb-3 form-check">
                            <Form.Check.Input name="remember" id="remember" 
                            checked={remember} onChange={() => setRemember
                            (!remember)} />
                            <Form.Check.Label htmlFor="remember">Remember Me</Form.Check.Label>
                        </div>
                        <div className="mb-3 d-grid">
                            <SubmitButton loading={loading}
                            icon="fa-arrow-right-to-bracket" label="Log In" />
                        </div>                        
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}
