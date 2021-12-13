import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import BottomFooter from "../components/BottomFooter";

function Home(props) {
  return (
    <>
      <TopNavbar></TopNavbar>
      <Container fluid>
        <Row>
          <Col>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1>Full stack developer code challenge</h1>
          </Col>
          <Col>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Container>
      <BottomFooter></BottomFooter>
    </>
  );
}

export default Home;
