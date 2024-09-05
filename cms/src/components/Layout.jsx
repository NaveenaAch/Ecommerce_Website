import { NavBar } from "./"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Layout.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { empty } from "../lib"

export const Layout = () => {

    const user = useSelector(st => st.user.value)

    return <>
        
        {!empty(user) ? <NavBar /> : null}

        <Outlet />        
    </>
}
