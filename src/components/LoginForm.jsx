import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUser(username);
      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleLogin} style={styles.form}>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        required
        style={styles.input}
      />
      <div style={{ marginBottom: '1rem' }}>
        <a href="#" style={styles.link}>¿Olvidaste tu contraseña?</a>
      </div>
      <div>
        <button type="button" onClick={handleCancel} style={styles.cancelBtn}>
          Cancelar
        </button>
        <button type="submit" style={styles.loginBtn}>
          Ingresar
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    margin: '2rem auto',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem'
  },
  link: {
    color: '#28A745',
    textDecoration: 'underline',
    fontSize: '0.9rem'
  },
  cancelBtn: {
    marginRight: '1rem',
    backgroundColor: '#ccc',
    border: 'none',
    padding: '0.5rem 1rem'
  },
  loginBtn: {
    backgroundColor: '#28A745',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem'
  }
};

export default LoginForm;
