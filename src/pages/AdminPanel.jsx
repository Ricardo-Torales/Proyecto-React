import ProductManager from '../components/ProductManager';
import UserManager from '../components/UserManager';

const AdminPanel = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔐 Panel de Administración</h2>
      <ProductManager />
      <hr />
      <UserManager />
    </div>
  );
};

export default AdminPanel;
