import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="/home">demramagiat</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          demramagiat
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/user" >User</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link> */}
            <Link to="/user" className="nav-link">
              User
            </Link>
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          </Nav>
          <div className="authen">
            <button>Login</button>
            <button>Logout</button>
          </div>
          <NavDropdown title="Details" id="basic-nav-dropdown">
            {/* <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item> */}
            <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Home;
