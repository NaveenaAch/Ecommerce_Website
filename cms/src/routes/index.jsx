import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import { Auth, Brands, Categories, Customers, Dashboard, Orders, Products, Profile, Reviews, Staffs } from "../pages"
import { PrivateRoute } from "./PrivateRoute"
import { AdminRoute } from "./AdminRoute"

export const RouteList = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PrivateRoute element={<Dashboard.List />}/>} />

                <Route path="edit-profile" element={<PrivateRoute element={<Profile.Edit />}/>} />

                <Route path="change-password" element={<PrivateRoute element={<Profile.Password />}/>} />

                <Route path="staffs" element={<AdminRoute element={<Outlet />} />}>
                    <Route index element={<Staffs.List />} />
                    <Route path="create" element={<Staffs.Create />} />
                    <Route path=":id/edit" element={<Staffs.Edit />} />
                </Route>

                <Route path="customers" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Customers.List />} />
                    <Route path="create" element={<Customers.create />} />
                    <Route path=":id/edit" element={<Customers.Edit />} />
                </Route>

                <Route path="categories" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Categories.List />} />
                    <Route path="create" element={<Categories.create />} />
                    <Route path=":id/edit" element={<Categories.Edit />} />
                </Route>

                <Route path="brands" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Brands.List />} />
                    <Route path="create" element={<Brands.create />} />
                    <Route path=":id/edit" element={<Brands.Edit />} />
                </Route>

                <Route path="products" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Products.List />} />
                    <Route path="create" element={<Products.create />} />
                    <Route path=":id/edit" element={<Products.Edit />} />
                </Route>

                <Route path="reviews" element={<PrivateRoute element={<Reviews.List />} />} />

                <Route path="orders" element={<PrivateRoute element={<Orders.List />} />} />

                <Route path="/login" element={<Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}
