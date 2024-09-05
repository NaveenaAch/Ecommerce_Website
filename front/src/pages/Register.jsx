import { useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { setInState } from "../lib"
import http from "../http"

export const Register = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('register', form)
            .then(() => navigate('/login'))
            .catch(() => {})
            .finally(() => setLoading(false))
    }


    return <div className="col-12">
    <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
            <h2>Register</h2>
        </div>
    </div>

    <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
            <div className="row">
                <div className="col-12">
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control id="name" name="name" onChange={e => setInState
                            (e, form, setForm)} required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control type="email" id="email" name="email" onChange={e => setInState
                            (e, form, setForm)} required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" id="password" name="password" onChange={e => setInState
                            (e, form, setForm)} required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="confirm_password">Confirm Password</Form.Label>
                            <Form.Control type="password" id="confirm_password" name="confirm_password" onChange={e => setInState
                            (e, form, setForm)} required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control id="phone" name="phone" onChange={e => setInState
                            (e, form, setForm)} required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="address">Address</Form.Label>
                            <Form.Control as="textarea" id="address" name="address" onChange={e => setInState
                            (e, form, setForm)} required />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn 
                            btn-dark" disabled={loading}>
                                {loading ? <i className="fa-solid
                                fa-spinner fa-spin me-2"></i> : null }
                                Register
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>

    </main>
</div>
}