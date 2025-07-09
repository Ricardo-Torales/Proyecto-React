import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import CocktailList from './pages/CocktailList';
import CartCheckout from './pages/CartCheckout';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/cocktails" element={<CocktailList />} />
        <Route path="/cartCheckout" element={<CartCheckout />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
