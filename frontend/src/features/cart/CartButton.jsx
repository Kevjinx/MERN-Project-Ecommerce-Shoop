import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './cartSlice.js';
import { Button } from 'react-bootstrap';

const CartButton = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);

  //workaround for redux quantity bug, will fix later
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setQuantity(1);
    dispatch(addToCart(product));
    setIsAdded(true);
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(incrementQuantity(product));
  };

  const handleDecrementQuantity = () => {
    quantity === 1 && setIsAdded(false);
    setQuantity(quantity - 1);
    dispatch(decrementQuantity(product));
  };

  const handleRemoveFromCart = () => {
    setQuantity(0);
    dispatch(removeFromCart(product));
    setIsAdded(false);
  };

  return (
    <div>
      <Button variant="dark" onClick={handleAddToCart} disabled={isAdded}>
        {isAdded ? 'Added to cart!' : 'Add to cart'}
      </Button>
      <div>
        <Button
          variant="dark"
          onClick={handleIncrementQuantity}
          disabled={!isAdded}
        >
          +
        </Button>
        <Button
          variant="dark"
          onClick={handleDecrementQuantity}
          disabled={!isAdded}
        >
          -
        </Button>
      </div>
      <Button variant="dark" onClick={handleRemoveFromCart} disabled={!isAdded}>
        {isAdded ? 'Remove from cart' : 'Removed from cart'}
      </Button>
    </div>
  );
};

export default CartButton;
