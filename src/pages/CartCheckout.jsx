import { useCart } from 'context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartCheckout = () => {
  const { cart, total, incrementQty, decrementQty } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} - ${item.price} x {item.qty}
          <button onClick={() => decrementQty(item.id)} style={buttonStyle}>-</button>
          <button onClick={() => incrementQty(item.id)} style={buttonStyle}>+</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>

      <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={() => navigate('/')}
              style={{ ...buttonStyle, marginRight: '1rem', backgroundColor: '#ccc' }}
            >
              🛍️ Seguir comprando
            </button>
            <button
              onClick={() => navigate('/checkout')}
              style={{ ...buttonStyle, backgroundColor: '#4CAF50', color: 'white' }}
            >
              Proceder al pago
            </button>
          </div>
    </div>
  );
};

const buttonStyle = {
  margin: '0 0.25rem',
  padding: '0.4rem 0.7rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default CartCheckout;
