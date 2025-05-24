// src/components/ProductCard.jsx
const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    margin: '0.5rem',
    textAlign: 'center',
    width: '200px'
  }
};

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>💲{product.price}</p>
      <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
    </div>
  );
};

export default ProductCard;