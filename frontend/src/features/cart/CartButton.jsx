import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './cartSlice.js';
import { Button, Badge } from 'react-bootstrap';
import { FaCartPlus, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

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
          <FaCartPlus />
          Add to cart
        </Button>
      )}
      {quantity > 0 && (
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <FaCartPlus size={20} />
            <Badge bg="secondary">{quantity}</Badge>
          </div>
          <div className="d-flex">
            <Button
              variant="outline-secondary"
              onClick={handleIncrementQuantity}
            >
              <FaPlus />
            </Button>
            <Button
              variant="outline-secondary"
              onClick={handleDecrementQuantity}
            >
              <FaMinus />
            </Button>
            <Button variant="outline-secondary" onClick={handleRemoveFromCart}>
              <FaTrash />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartButton;
