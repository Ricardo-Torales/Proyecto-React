// src/components/ProductList.jsx
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'start' }}>
  {products.map((prod) => (
    <ProductCard key={prod.id} product={prod} onAddToCart={onAddToCart} />
  ))}
</div>
  );
};

export default ProductList;
