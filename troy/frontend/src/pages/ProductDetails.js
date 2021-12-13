import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useHistory, useParams } from "react-router-dom";
import BottomFooter from "../components/BottomFooter";
import TopNavbar from "../components/TopNavbar";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Table from "react-bootstrap/Table";
import { RetrieveProducts } from "../api/Products";
import productImg from "../img/product.png";

function ProductDetails(props) {
  const history = useHistory();
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const productResponse = await RetrieveProducts(id);
      if (productResponse.statuscode === 400) {
        history.push("/login");
      } else {
        const productData = productResponse.data;
        if (productData) {
          setProduct(productData);
        }
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <TopNavbar></TopNavbar>
      <br></br>
      <Container>
        <Card className="card shadow p-1 mb-1 bg-white">
          <Card.Body>
            <Card.Title>
              <Card.Body>
                <Container style={{ textAlign: "left" }}>
                  <Row>
                    <Col sm={2}>
                      <img
                        alt=""
                        src={productImg}
                        height="120"
                        className="d-inline-block align-top"
                      ></img>
                    </Col>
                    <Col sm={1}></Col>
                    <Col sm={9}>
                      <h1>{product.name}</h1>
                      <small>{product.desc}</small>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card.Title>
            <Card.Text></Card.Text>
            <Card.Footer>
              <br></br>
              <Table size="sm" hover striped style={{ textAlign: "left" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "25%" }}>ID</td>
                    <td style={{ width: "75%" }}>{product.id}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "25%" }}>Units</td>
                    <td style={{ width: "75%" }}>{product.units}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "25%" }}>Category</td>
                    <td style={{ width: "75%" }}>{product.category}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
      <BottomFooter></BottomFooter>
    </>
  );
}

export default ProductDetails;
