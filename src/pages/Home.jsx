import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/products');
        if (!res.ok) throw new Error('Error al obtener productos');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Fallo al cargar productos:', err);
        setError('No se pudieron cargar los productos. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div>
        <h1>🛍️ Productos</h1>
        {loading && <p>Cargando productos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <ProductList products={products} onAddToCart={addToCart} />
        )}
      </div>
      <div>
        <Cart
          cartItems={cart}
          onRemoveFromCart={(index) => {
            const item = cart[index];
            if (item) {
              removeFromCart(item.id);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Home;

