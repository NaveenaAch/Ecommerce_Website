import { useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { intoStorage, setInState } from "../lib"
import http from "../http"
import { useDispatch } from "react-redux"
import { setUser } from "../store"
import { toast } from "react-toastify"

export const Login = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [remember, setRemember] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('login', form)
            .then(({data}) => {
                if(['Customer'].includes(data.user.type)){
                    intoStorage('user_token', data.token, remember)
                    dispatch(setUser(data.user))
                    navigate('/')
                }else{
                    toast.error('Access denied')
                }
                
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }


    return <div className="col-12">
    <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
            <h2>Login</h2>
        </div>
    </div>

    <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
            <div className="row">
                <div className="col-12">
                    <Form onSubmit={handleSubmit}>
                        
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
                        
                        <div className="mb-3 form-check">
                            <Form.Check.Input id="remember" checked=
                            {remember} onChange={ev => setRemember(ev.
                            target.checked)} />
                            <Form.Check.Label htmlFor="remember">
                                Remember Me
                            </Form.Check.Label>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn 
                            btn-dark" disabled={loading}>
                                 {loading ? <i className="fa-solid
                                 fa-spinner fa-spin me-2"></i> : null } 
                                 Login
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>

    </main>
</div>
}