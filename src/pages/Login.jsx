// src/pages/Login.jsx
import LoginForm from '../components/LoginForm';

const Login = ({ setUser }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <LoginForm setUser={setUser} />
    </div>
  );
};

export default Login;
