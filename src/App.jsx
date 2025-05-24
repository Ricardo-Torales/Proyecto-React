// src/App.jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import CocktailList from './pages/CocktailList';
import CartCheckout from './pages/CartCheckout';
import Checkout from './pages/Checkout';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState('');

  const products = [
    { id: 1, name: 'Remera', price: 3500 },
    { id: 2, name: 'Pantalón', price: 8500 },
    { id: 3, name: 'Zapatillas', price: 15000 }
  ];

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/cocktails" element={<CocktailList />} />
        <Route path="/cartCheckout" element={<CartCheckout />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
