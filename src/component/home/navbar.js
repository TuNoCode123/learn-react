import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogOut from "./logOut";
import { useEffect, useState } from "react";
import Language from "../languages/languages";
import ChangePass from "../auth/changePass";
import { changePass } from "../../services";
import { toast } from "react-toastify";
const Home = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState();
  const [showChangePass, setShowChangePass] = useState();
  const user = useSelector((state) => state.login.user);
  const access_token = useSelector((state) => state.login.accessToken);
  const handleNavigte = () => {
    navigate("/login");
  };
  const handleClickChangePass = async (currentPass, newPass) => {
    const res = await changePass(currentPass, newPass);
    if (res.EC == 0) {
      toast.success(res.EM);
      setShowChangePass(false);
      return;
    }
    toast.error(res.EM);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Link to="/" className="navbar-brand">
          demramagiat
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex justify-content-between aligh-items-center"
        >
          <Nav>
            <Link to="/user" className="nav-link">
              User
            </Link>
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          </Nav>
          <Nav className="me-5">
            {user ? (
              <NavDropdown title="Details" id="basic-nav-dropdown">
                <NavDropdown.Item>{user}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setShow(true)}>
                  Log out
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setShowChangePass(true)}>
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <div className="authen d-flex gap-2">
                  <button className="btn btn-dark" onClick={handleNavigte}>
                    Login
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/sing-up")}
                  >
                    Sing up
                  </button>
                </div>
              </>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LogOut
        user={user}
        accessToken={access_token}
        setShow={setShow}
        show={show}
      />
      <ChangePass
        show={showChangePass}
        setShow={setShowChangePass}
        handleClickChangePass={handleClickChangePass}
      />
    </>
  );
};
export default Home;
