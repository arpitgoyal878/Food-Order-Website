import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formating";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {
  const cartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleCloseCart() {
    UserProgressCtx.hideCart();
  }

  function handleShowCheckout() {
    UserProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={UserProgressCtx.progress === "cart"}
      onClose={UserProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleShowCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
