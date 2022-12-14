import { Button, Card } from "react-bootstrap";
import { useCart } from "../context/cartContext";
import { formatCurrency } from "../utils/formatCurrency";

type ProductProps = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
};

export function Product({ id, image, price, title }: ProductProps) {
  const { addToCart, removeFromCart, getProductQuantity } = useCart();
  const quantity = getProductQuantity(id);
  return (
    <Card className="h-100">
      {" "}
      <Card.Img
        variant="top"
        src={image}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{title}</span>
          <span className="ms-2 text-muted"> {formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100 " onClick={() => addToCart(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  variant="outline-secondary"
                  onClick={() => removeFromCart(id)}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  variant="outline-secondary"
                  onClick={() => addToCart(id)}
                >
                  +
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
