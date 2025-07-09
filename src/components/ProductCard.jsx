const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    margin: '0.5rem',
    textAlign: 'center',
    width: '220px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem',
    backgroundColor: '#28A745',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer'
  },
  price: {
    fontWeight: 'bold',
    color: '#333'
  }
};

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      <p style={styles.price}>💲{product.price}</p>
      <p>Stock: {product.stock}</p>
      <button style={styles.button} onClick={() => onAddToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
