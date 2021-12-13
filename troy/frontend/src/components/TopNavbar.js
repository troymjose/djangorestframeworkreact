import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./TopNavbar.css";

function TopNavbar(props) {
  const style = {
    height: "60px",
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" style={style}>
        <Container>
          <Navbar.Brand>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            &nbsp;&nbsp; T R O Y{" "}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;
