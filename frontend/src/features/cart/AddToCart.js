import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice.js';
import { Button } from 'react-bootstrap';

const AddToCart = ({ productId }) => {
  console.log('productId: ', productId);

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId, quantity }));
    setIsAdded(true);
  };

  return (
    <div>
      <label>
        Quantity:
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </label>

      <Button variant="dark" onClick={handleAddToCart} disabled={isAdded}>
        {isAdded ? 'Added to cart!' : 'Add to cart'}
      </Button>
    </div>
  );
};

export default AddToCart;
