import { Badge, Button, Container, Nav, NavDropdown,  Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { clearUser } from "../store"
import { clearStorage } from "../lib"

export const NavBar = () => {

    const user = useSelector(st => st.user.value)

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(clearUser())
        clearStorage('cms_token')
    }

    return <Navbar expand="lg" variant="dark" bg="dark">
    <Container>
        <Link to="/" className="navbar-brand">Ecommerce</Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="me-auto">
                {user.type == 'Admin' ? <Nav.Item>
                    <NavLink className="nav-link" to="/staffs">
                        <i className="fa-solid fa-users me-2"></i>Staffs
                    </NavLink>
                </Nav.Item> : null}
                <Nav.Item>
                    <NavLink className="nav-link" to="/customers">
                        <i className="fa-solid fa-user-friends me-2"></i>Customers
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink className="nav-link" to="/categories">
                        <i className="fa-solid fa-tags me-2"></i>Categories
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                <NavLink className="nav-link" to="/brands">
                    <i className="fa-solid fa-star me-2"></i>Brands
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink className="nav-link" to="/products">
                    <i className="fa-solid fa-gifts me-2"></i>Products
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink className="nav-link" to="/reviews">
                    <i className="fa-solid fa-comments me-2"></i>Reviews
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink className="nav-link" to="/orders">
                    <i className="fa-solid fa-money-bill me-2"></i>Orders
                </NavLink>
            </Nav.Item>
            </Nav>
            
            <Nav>
                <NavDropdown title={<><i className="fa-solid fa-user-circle 
                me-2"></i>{user.name}</>} align="end">
                    <div className="dropdown-item text-end">
                        <Badge bg={user.type == 'Admin' ? 'primary': 'info'}>{user.type}</Badge>
                    </div>
                    <Link to="/edit-profile" className="dropdown-item">
                        <i className="fa-solid fa-user-edit me-2"></i>Edit Profile
                    </Link>
                    <Link to="/change-password" className="dropdown-item">
                        <i className="fa-solid fa-asterisk me-2"></i>Change Password
                    </Link>
                    <NavDropdown.Divider />
                    <Button variant="link" className="dropdown-item rounded-0"
                    onClick={handleLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
                    </Button>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
}