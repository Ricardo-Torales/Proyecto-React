import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems = [], onRemoveFromCart }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h2>🧺 Carrito</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={styles.item}>
                {item.name} x{item.qty} - ${item.price * item.qty}
                <button
                  onClick={() => onRemoveFromCart(index)}
                  style={styles.removeButton}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <button onClick={() => navigate('/cartCheckout')} style={styles.checkoutButton}>
            Ir al Checkout
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  item: {
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: '1rem',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    padding: '4px 8px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  checkoutButton: {
    marginTop: '1rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Cart;
