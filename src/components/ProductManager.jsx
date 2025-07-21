import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaPlus, FaTrash, FaEdit, FaSave
} from 'react-icons/fa';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => toast.error('Error al cargar productos'));
  }, []);

  const validateProduct = () => {
    if (!newProduct.name.trim()) {
      setError('El nombre es obligatorio.');
      return false;
    }
    if (Number(newProduct.price) <= 0) {
      setError('El precio debe ser mayor a 0.');
      return false;
    }
    if (newProduct.description.trim().length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.');
      return false;
    }
    setError('');
    return true;
  };

  const handleAddProduct = () => {
    if (!validateProduct()) return;

    const product = {
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      id: crypto.randomUUID()
    };

    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(() => {
      setProducts([...products, product]);
      setNewProduct({ name: '', description: '', price: '', stock: '' });
      toast.success('Producto agregado exitosamente');
    }).catch(() => toast.error('Error al agregar producto'));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/products/${id}`, { method: 'DELETE' })
      .then(() => {
        setProducts(products.filter(p => p.id !== id));
        toast.success('Producto eliminado');
      })
      .catch(() => toast.error('Error al eliminar producto'));
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
  };

  const handleSave = () => {
    fetch(`http://localhost:3001/products/${editProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProduct)
    }).then(() => {
      setProducts(products.map(p => (p.id === editProduct.id ? editProduct : p)));
      setEditProduct(null);
      toast.success('Producto actualizado');
    }).catch(() => toast.error('Error al actualizar producto'));
  };

  return (
    <div aria-label="Gestión de productos">
      <Helmet>
        <title>Gestión de Productos | Admin</title>
        <meta name="description" content="Administrar productos: agregar, editar y eliminar." />
      </Helmet>

      <h3>➕ Agregar nuevo producto</h3>
      <input
        value={newProduct.name}
        placeholder="Nombre"
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        aria-label="Nombre del nuevo producto"
      />
      <input
        value={newProduct.description}
        placeholder="Descripción"
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        aria-label="Descripción del nuevo producto"
      />
      <input
        type="number"
        value={newProduct.price}
        placeholder="Precio"
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        aria-label="Precio del nuevo producto"
      />
      <input
        type="number"
        value={newProduct.stock}
        placeholder="Stock"
        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        aria-label="Stock del nuevo producto"
      />
      <button onClick={handleAddProduct} aria-label="Agregar producto">
        <FaPlus /> Agregar
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>🛠️ Productos existentes</h3>
      {products.map(p => (
        <div key={p.id} style={styles.item}>
          {editProduct?.id === p.id ? (
            <>
              <input
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                aria-label="Editar nombre"
              />
              <input
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                aria-label="Editar descripción"
              />
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                aria-label="Editar precio"
              />
              <input
                type="number"
                value={editProduct.stock}
                onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                aria-label="Editar stock"
              />
              <button onClick={handleSave} aria-label="Guardar producto">
                <FaSave /> Guardar
              </button>
            </>
          ) : (
            <>
              <strong>{p.name}</strong> - ${p.price} - Stock: {p.stock}
              <br />
              <em>{p.description}</em>
              <br />
              <button onClick={() => handleEdit(p)} aria-label="Editar producto">
                <FaEdit /> Editar
              </button>
              <button onClick={() => handleDelete(p.id)} aria-label="Eliminar producto">
                <FaTrash /> Eliminar
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  item: {
    marginBottom: '1rem',
    padding: '0.5rem',
    borderBottom: '1px solid #ccc'
  }
};

export default ProductManager;
