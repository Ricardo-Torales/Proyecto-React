// src/pages/Home.jsx
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

const Home = ({ products }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div>
        <h1>🛍️ Productos</h1>
        <ProductList products={products} onAddToCart={addToCart} />
      </div>
      <div>
        <Cart cartItems={cart} onRemoveFromCart={(index) => {
          const item = cart[index];
          if (item) {
            removeFromCart(item.id);
          }
        }} />
      </div>
    </div>
  );
};

export default Home;
