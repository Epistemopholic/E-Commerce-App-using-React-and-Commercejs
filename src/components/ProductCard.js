import "./ProductCard.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { MdArticle } from "react-icons/md";
function ProductCard(props) {
  return (
    <Container fluid>
      <Row xs={1} md={4} className="g-2 p-4 mb-4 bg-body rounded">
        {props.products.map((product) => (
          <Col key={product.id} className="d-flex align-items-stretch">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                height="400vh"
                src={product.image.url}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {
                    <span
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  }
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link
                  to={`/product/${product.id}`}
                  type="Button"
                  className="btn btn-sm rounded btn-primary-new"
                >
                  <MdArticle size={20} className="style" />
                  More Details
                </Link>
                <Badge
                  pill
                  bg="primary-new"
                  className="rounded-pill float-end my-1 shadow-sm text-black"
                >
                  {product.price.formatted_with_symbol}/-
                </Badge>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductCard;
