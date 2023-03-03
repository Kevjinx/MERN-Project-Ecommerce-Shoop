import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './cartSlice.js';
import { Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaCartPlus, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartButton = ({ product }) => {
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
      {quantity === 0 && cartProducts ? (
        <Button
          disabled={product.countInStock === 0}
          variant="dark"
          onClick={() => dispatch(addToCart(product))}
        >
          <FaCartPlus />
          Add to cart
        </Button>
      ) : (
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <FaCartPlus size={20} />
            <Badge bg="secondary">{quantity}</Badge>
          </div>
          <ButtonGroup>
            <Button
              size="sm"
              disabled={product.countInStock === quantity}
              variant="success"
              onClick={handleIncrementQuantity}
            >
              <FaPlus />
            </Button>
            <Button
              size="sm"
              variant="warning"
              onClick={handleDecrementQuantity}
            >
              <FaMinus />
            </Button>
            <Button size="sm" variant="danger" onClick={handleRemoveFromCart}>
              <FaTrash />
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};

export default CartButton;
