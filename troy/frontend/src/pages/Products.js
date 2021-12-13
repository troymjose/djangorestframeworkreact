import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import BottomFooter from "../components/BottomFooter";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import {
  faArchive,
  faCubes,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/Badge";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import ProductCard from "../components/ProductCard";
import { ListProducts } from "../api/Products";

function Products(props) {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [productCategory, setProductCategory] = useState([
    "",
    "All Categories",
  ]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterProducts = () => {
    const results = products.filter(
      (val) =>
        (val.name.toLowerCase().includes(search.toLowerCase()) ||
          //   val.id.toString().toLowerCase().includes(search.toLowerCase()) ||
          val.desc.toLowerCase().includes(search.toLowerCase())) &&
        //   ||
        //   val.units.toString().toLowerCase().includes(search.toLowerCase()) ||
        //   val.category.toLowerCase().includes(search.toLowerCase())
        (val.category === productCategory[0] || productCategory[0] === "")
    );
    return results;
  };

  useEffect(() => {
    const getProducts = async () => {
      const productsResponse = await ListProducts();
      if (productsResponse.statuscode === 400) {
        history.push("/login");
      } else {
        const all_products = productsResponse.data;
        if (all_products) {
          setProducts(all_products);
          setFilteredProducts(all_products);
        }
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [productCategory]);

  useEffect(() => {
    if (search === "") {
      const results = products.filter(
        (val) =>
          val.category
            .toLowerCase()
            .includes(productCategory[0].toLocaleLowerCase()) ||
          productCategory[0] === ""
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(filterProducts());
    }
  }, [search]);

  const ProductCards = filteredProducts.map((val, index) => {
    return (
      <Col>
        <ProductCard link="/user" id={val.id} btnText={val.name}></ProductCard>
      </Col>
    );
  });

  if (
    localStorage.getItem("access") === null ||
    localStorage.getItem("access") === ""
  ) {
    history.push("/login");
    return <></>;
  }

  return (
    <>
      <TopNavbar></TopNavbar>
      <br></br>
      <Container>
        <Row>
          <Col sm={6} style={{ textAlign: "left" }}>
            <h5>
              <FontAwesomeIcon
                icon={faArchive}
                color="#ff3939"
              ></FontAwesomeIcon>
              &nbsp;Products &nbsp;
              <Badge pill bg="light">
                {filteredProducts.length}
              </Badge>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <FontAwesomeIcon icon={faCubes} color="#ff3939"></FontAwesomeIcon>
              &nbsp;Category &nbsp;
              <Badge pill bg="light">
                {productCategory[1]}
              </Badge>
            </h5>
          </Col>
          <Col sm={6}>
            <Container>
              <Row>
                <Col sm={8} style={{ textAlign: "right" }}>
                  <FormControl
                    type="search"
                    placeholder="Search Products . . ."
                    className="mr-2"
                    aria-labe="Search"
                    onChange={(event) => setSearch(event.target.value)}
                  ></FormControl>
                </Col>
                <Col sm={2} style={{ textAlign: "right" }}>
                  <Button variant="outline-secondary" onClick={handleShow}>
                    <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                  </Button>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                  >
                    <Modal.Header>
                      <Modal.Title>
                        {" "}
                        <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>{" "}
                        Category Filter
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Label>
                        Product Category{" "}
                        <FontAwesomeIcon icon={faCubes}></FontAwesomeIcon>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        custom
                        onChange={(event) =>
                          setProductCategory([
                            event.target.value,
                            event.target[event.target.selectedIndex]
                              .textContent,
                          ])
                        }
                        defaultValue={productCategory[0]}
                      >
                        <option value="">All Categories</option>
                        <option value="Plane">Plane</option>
                        <option value="Helicopter">Helicopter</option>
                      </Form.Control>
                      <br></br>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <br></br>
        <Row>
          {/* <CardGroup>{ProductCards}</CardGroup> */}

          <Row sm={12} md={12} className="g-4">
            {ProductCards}
          </Row>
        </Row>
      </Container>
      <br></br>
      <BottomFooter></BottomFooter>
    </>
  );
}

export default Products;
