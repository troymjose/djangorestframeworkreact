import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import LoginForm from "../components/LoginForm";
import TopNavbar from "../components/TopNavbar";
import BottomFooter from "../components/BottomFooter";

function Login(props) {
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
            <h1>Welcom Back !</h1>
          </Col>
          <Col>
            <LoginForm></LoginForm>
          </Col>
        </Row>
      </Container>
      <BottomFooter></BottomFooter>
    </>
  );
}

export default Login;
