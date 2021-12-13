import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import BottomFooter from "../components/BottomFooter";
import Card from "react-bootstrap/Card";

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
            <h1>Full stack developer</h1>
            <h3> code challenge</h3>
          </Col>
          <Col>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Link
              to="/login"
              style={{ width: "50%", height: "90px" }}
              className="card shadow p-1 mb-1 bg-white"
            >
              <Card.Body>
                <Card.Title>
                  <h3>Login</h3>
                </Card.Title>
              </Card.Body>
            </Link>
          </Col>
        </Row>
      </Container>
      <BottomFooter></BottomFooter>
    </>
  );
}

export default Home;
