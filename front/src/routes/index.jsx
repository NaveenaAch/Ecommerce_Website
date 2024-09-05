import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";
import { PrivateRoute } from "./PrivateRoute"

export const RouteList = () => {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>

                <Route index element={<Pages.Home />} />

                <Route path="category/:id" element={<Pages.Category />}></Route>

                <Route path="brand/:id" element={<Pages.Brand />}></Route>

                <Route path="product/:id" element={<Pages.Product />}></Route>

                <Route path="search" element={<Pages.Search />}></Route>

                <Route path="cart" element={<Pages.Cart />}></Route>

                <Route path="register" element={<Pages.Register />}></Route>

                <Route path="login" element={<Pages.Login />}></Route>

                <Route path="profile" element={<PrivateRoute element={<Pages.Profile.Dashboard />} />}/>

                <Route path="*" element={<h1 className="text-center">404 Page Not Found</h1>} />
            </Route>
            
        </Routes>
    </BrowserRouter>
    
}