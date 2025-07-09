import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ user, setUser }) => {
  const isAdmin = user === "Admin";

  const handleLogout = () => {
    setUser("");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🛒 La Economía</Link>

      <div style={styles.linksContainer}>
        <Link to="/cocktails" style={styles.link}>Cócteles</Link>
        <Link to="/register" style={styles.link}>Registrarse</Link>

        {!user && <Link to="/login" style={styles.link}>Login</Link>}

        {isAdmin && (
          <>
            <Link to="/admin" style={styles.link}>Administrar Productos</Link>
            <Link to="/admin" style={styles.link}>Administrar Usuarios</Link>
          </>
        )}
      </div>

      <div style={styles.rightSection}>
        {user && (
          <>
            <span style={styles.user}>Hola, {user} 👋</span>
            <button onClick={handleLogout} style={styles.logoutButton}>Cerrar sesión</button>
          </>
        )}
        <Link to="/cartCheckout" style={styles.link}>
          Mi Carrito <FaShoppingCart size={20} color="#fff" />
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A3F54',
    padding: '1rem',
    color: '#fff'
  },
  logo: {
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#fff'
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  link: {
    color: '#28A745',
    textDecoration: 'none',
    marginRight: '1rem'
  },
  user: {
    marginRight: '1rem',
    fontStyle: 'italic'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center'
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    color: '#fff',
    padding: '0.4rem 0.6rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '1rem'
  }
};

export default Navbar;
