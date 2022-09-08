import { Button, Modal } from "react-bootstrap";
import { useCart } from "../context/cartContext";

export function Cart() {
  const { cartItems, cartQuantity, clearCart, closeCart } = useCart();
  return (
    <Modal show={cartQuantity > 0} onHide={closeCart}>
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.map((item) => (
          <div key={item.id} className="d-flex justify-content-between">
            <span>{item.id}</span>
            <span>{item.quantity}</span>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeCart}>
          Close
        </Button>
        <Button variant="primary" onClick={clearCart}>
          Clear Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
