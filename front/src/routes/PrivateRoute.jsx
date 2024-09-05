import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, empty, fromStorage } from "../lib"
import { useNavigate } from "react-router-dom"
import http from "../http"
import { clearUser, setUser } from "../store"

export const PrivateRoute = ({element}) => {

    const user = useSelector(st => st.user.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(empty(user)) {
            const token = fromStorage('user_token')
            
            if(!empty(token)) {
                http.get('profile/details')
                    .then(({data}) => {
                        dispatch(setUser(data))
                    })
                    .catch(err => {
                        dispatch(clearUser())
                        clearStorage('user_token')
                    })
            } else {
                navigate('/login')
            }
        }
    }, [user])

    return element
}