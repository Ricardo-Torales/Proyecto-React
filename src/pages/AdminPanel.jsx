import ProductManager from '../components/ProductManager';
import UserManager from '../components/UserManager';

const AdminPanel = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔐 Panel de Administración</h2>
      <div style={styles.panelContainer}>
        <div style={styles.section}>
          <h3>🛍️ Gestión de Productos</h3>
          <ProductManager />
        </div>
        <div style={styles.section}>
          <h3>👤 Gestión de Usuarios</h3>
          <UserManager />
        </div>
      </div>
    </div>
  );
};

const styles = {
  panelContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    marginTop: '1rem',
  },
  section: {
    flex: '1 1 45%',
    minWidth: '300px',
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
};

export default AdminPanel;