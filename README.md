# 🛒 Tienda Online React

Este es un proyecto de tienda online desarrollado con **React**, que incluye funcionalidad de **carrito de compras con contexto global (`Context API`)**, navegación entre páginas con **React Router**, y manejo de sesión de usuario.

## 🚀 Características

- Vista de productos con opción para agregar al carrito
- Carrito con cantidad dinámica por producto
- Sumar y restar cantidad desde el carrito
- Eliminar productos individualmente
- Total actualizado automáticamente
- Navegación con React Router (`Home`, `Login`, `Checkout`, etc.)
- Contexto de carrito (`CartContext`) para manejo global del estado
- Checkout simulado
- Botón para seguir comprando

## 📁 Estructura de carpetas
src/
├── App.jsx
├── main.jsx
├── context/
│ └── CartContext.jsx
├── components/
│ ├── Navbar.jsx
│ ├── Cart.jsx
│ ├── ProductCard.jsx
│ └── ProductList.jsx
├── pages/
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── Checkout.jsx
│ └── CartCheckout.jsx
