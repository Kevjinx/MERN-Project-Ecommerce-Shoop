import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from './cartSlice';
import { Button } from 'react-bootstrap';

const ClearCartButton = () => {
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
    window.location.reload();
  };

  return (
    <Button variant="danger" onClick={handleClearCart}>
      Clear Cart
    </Button>
  );
};

export default ClearCartButton;
