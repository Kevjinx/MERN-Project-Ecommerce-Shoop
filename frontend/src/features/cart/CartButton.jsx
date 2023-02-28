import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './cartSlice.js';
import { Button, Badge } from 'react-bootstrap';

const CartButton = ({ product }) => {
  //workaround for redux quantity bug, will fix later
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setQuantity(1);
    dispatch(addToCart(product));
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(incrementQuantity(product));
  };

  const handleDecrementQuantity = () => {
    setQuantity(quantity - 1);
    dispatch(decrementQuantity(product));
  };

  const handleRemoveFromCart = () => {
    setQuantity(0);
    dispatch(removeFromCart(product));
  };

  return (
    <div>
      {quantity === 0 && (
        <Button variant="dark" onClick={handleAddToCart}>
          Add to cart
        </Button>
      )}
      {quantity > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <i class="fa-solid fa-cart-shopping">
            <Badge bg="secondary">{quantity}</Badge>
          </i>
          <div>
            <Button
              variant="dark"
              onClick={handleIncrementQuantity}
              disabled={quantity === 0}
            >
              +
            </Button>
            <Button
              variant="dark"
              onClick={handleDecrementQuantity}
              disabled={quantity === 0}
            >
              -
            </Button>
            <Button
              variant="dark"
              onClick={handleRemoveFromCart}
              disabled={quantity === 0}
            >
              <i class="fa-solid fa-trash"></i>{' '}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartButton;
