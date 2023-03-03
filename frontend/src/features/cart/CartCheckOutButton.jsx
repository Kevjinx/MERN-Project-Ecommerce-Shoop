// TODO: Refactor to combine cart button and cart checkout button
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './cartSlice.js';
import { Button, Badge } from 'react-bootstrap';
import { FaCartPlus, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartCheckOutButton = ({ product }) => {
  //workaround for redux quantity bug, will fix later
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  //update quantity whenever cartProducts changes
  useEffect(() => {
    const productInCart = cartProducts.find(
      (cartProduct) => cartProduct._id === product._id
    );
    productInCart && setQuantity(productInCart.quantity);
  }, [cartProducts]);

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(product));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product));
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <FaCartPlus size={20} />
          <Badge bg="secondary">{quantity}</Badge>
          <Badge bg="secondary">{}</Badge>
        </div>
        <div className="d-flex">
          <Button
            disabled={product.countInStock === quantity}
            variant="outline-secondary"
            onClick={handleIncrementQuantity}
          >
            <FaPlus />
          </Button>
          <Button variant="outline-secondary" onClick={handleDecrementQuantity}>
            <FaMinus />
          </Button>
          <Button variant="outline-secondary" onClick={handleRemoveFromCart}>
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartCheckOutButton;
