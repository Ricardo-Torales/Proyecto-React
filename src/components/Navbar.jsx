// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';



const Navbar = ({ user }) => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🛒 La Economía</Link>
      <div>
        <Link to="/cocktails" style={styles.link}>Cócteles</Link>
        <Link to="/login" style={styles.link}>Administrar</Link>
      </div>
      {user && <span style={styles.user}>Hola, {user} 👋</span>}
      <Link to="/cartCheckout" style={styles.link}>Mi Carrito <FaShoppingCart size={24} color="#fff" /></Link>
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
  link: {
    color: '#28A745',
    textDecoration: 'none',
    marginRight: '1rem'
  },
  user: {
    marginLeft: '1rem',
    fontStyle: 'italic'
  }
};

export default Navbar;
