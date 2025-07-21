import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';
import './home.css';

const Home = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/products');
        if (!res.ok) throw new Error('Error al obtener productos');
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('Fallo al cargar productos:', err);
        setError('No se pudieron cargar los productos. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <>
      <Helmet>
        <title>Inicio | La Economía</title>
        <meta name="description" content="Explora nuestra tienda online y descubre productos únicos para comprar desde casa." />
      </Helmet>

      <div className="home-container" role="main" aria-label="Contenido principal">
        <div className="products-section" aria-labelledby="titulo-productos">
          <h1 id="titulo-productos" className="title">🛍️ Productos</h1>

          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Buscar productos"
          />

          {loading && <p>Cargando productos...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && (
            <ProductList products={filteredProducts} onAddToCart={addToCart} />
          )}
        </div>

        <div className="cart-section" role="complementary" aria-label="Carrito de compras">
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
    </>
  );
};

export default Home;
