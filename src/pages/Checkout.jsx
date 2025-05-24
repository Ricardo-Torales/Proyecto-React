import { useCart } from 'context/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { total, clearCart } = useCart();

  const handlePayment = () => {
    alert('✅ Pago realizado exitosamente!');
    clearCart();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💳 Página de Pago</h2>
      <p>Total a pagar: ${total.toFixed(2)}</p>

      <button onClick={handlePayment}>Pagar ahora</button>
      <div style={{ marginTop: 20 }}>
        <Link to="/">← Volver al inicio</Link>
      </div>
    </div>
  );
};

export default Checkout;
