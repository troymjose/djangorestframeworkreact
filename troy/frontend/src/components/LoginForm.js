import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GetAccessToken } from "../api/Token";

function LoginForm(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("access", accessToken);
  }, []);

  useEffect(() => {
    localStorage.setItem("refresh", refreshToken);
  }, []);

  const getToken = async () => {
    const result = await GetAccessToken(username, password);
    if (result.statuscode === 200) {
      history.push("/products");
    } else {
      setMessage(result.message);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const style = {
    height: "350px",
    width: "450px",
    marginTop: "30px",
  };
  return (
    <div>
      <Card className="shadow p-1 mb-1 bg-white" style={style}>
        <Card.Header>
          <h3 style={{ color: "#6c757d" }}>LOGIN FORM</h3>
        </Card.Header>
        <Card.Body>
          <sm style={{ color: "#ff6868" }}>{message}</sm>
          <Card.Text>
            <br></br>
            <Form.Group as={Row} controlId="formHorizontalUsername">
              <Form.Label column sm={1}>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </Form.Label>
              <Col sm={11}>
                <Form.Control
                  onChange={handleUsernameChange}
                  type="email"
                  placeholder="Enter Username"
                />
              </Col>
            </Form.Group>
            <br></br>
            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={1}>
                <FontAwesomeIcon icon={faKey}></FontAwesomeIcon>
              </Form.Label>
              <Col sm={11}>
                <Form.Control
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Enter Password"
                />
              </Col>
            </Form.Group>
            <br></br>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="outline-secondary" onClick={getToken}>
            Login &nbsp; <FontAwesomeIcon icon={faUnlock}></FontAwesomeIcon>
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default LoginForm;
