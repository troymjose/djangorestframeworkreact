import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import productImg from "../img/product.png";

function ProductCard(props) {
  const history = useHistory();
  const url = "/products/details/" + props.id;
  const width = "240px";
  const height = "140px";
  const margin = "20px";
  return (
    <Link
      to={url}
      className="card shadow p-1 mb-1 bg-white"
      style={{
        minWidth: width,
        maxWidth: width,
        marginTop: margin,
        marginLeft: margin,
        minHeight: height,
        maxHeight: height,
        textDecoration: "none",
        color: "#333333",
      }}
    >
      <Card.Body>
        <Card.Title>
          <img
            src={productImg}
            alt="dasd"
            height="50"
            className="d-inline-block align-top"
          ></img>
        </Card.Title>
      </Card.Body>
      <Card.Footer>{props.btnText}</Card.Footer>
    </Link>
  );
}

export default ProductCard;
