import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import "./TopNavbar.css";
import { Link } from "react-router-dom";

function TopNavbar(props) {
  const style = {
    height: "60px",
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" style={style}>
        <Container>
          <Navbar.Brand href="/">
            &nbsp;&nbsp;<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
            &nbsp;&nbsp; T R O Y{" "}
          </Navbar.Brand>
          <span class="align-middle">
            <Link
              to="/login"
              style={{ width: "120px", height: "50%", color: "white" }}
              className="btn btn-outline-secondary"
            >
              Logout &nbsp;{" "}
              <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>{" "}
            </Link>
          </span>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;
