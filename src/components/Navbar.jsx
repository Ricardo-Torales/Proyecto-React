import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const isAdmin = user === "Admin";

  const handleLogout = () => {
    setUser("");
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // cierra el menú en desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🛒 La Economía</Link>

      {isMobile && (
        <button onClick={toggleMenu} style={styles.menuButton} aria-label="Menú">
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      <div
        style={{
          ...styles.linksContainer,
          ...(isMobile ? (isMenuOpen ? styles.linksContainerOpen : styles.linksContainerHidden) : {}),
        }}
      >
        <Link to="/cocktails" style={styles.link} onClick={handleLinkClick}>Cócteles</Link>
        <Link to="/register" style={styles.link} onClick={handleLinkClick}>Registrarse</Link>
        {!user && (
          <Link to="/login" style={styles.link} onClick={handleLinkClick}>Login</Link>
        )}
        {isAdmin && (
          <>
            <Link to="/admin" style={styles.link} onClick={handleLinkClick}>Administrar Productos</Link>
            <Link to="/admin" style={styles.link} onClick={handleLinkClick}>Administrar Usuarios</Link>
          </>
        )}
        {user && (
          <>
            <span style={styles.user}>Hola, {user} 👋</span>
            <button onClick={handleLogout} style={styles.logoutButton}>Cerrar sesión</button>
          </>
        )}
        <Link to="/cartCheckout" style={styles.link} onClick={handleLinkClick}>
          <FaShoppingCart size={18} color="#fff" /> Carrito
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0, // ✅ Corrige desplazamiento
    width: '100%',
    backgroundColor: '#2A3F54',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    color: '#fff',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  linksContainerHidden: {
    display: 'none',
  },
  linksContainerOpen: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '1rem',
    gap: '1rem',
  },
  link: {
    color: '#28A745',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    color: '#fff',
    padding: '0.4rem 0.6rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  user: {
    fontStyle: 'italic',
    color: '#ccc',
  },
};

export default Navbar;
