# 🛒 Tienda Online React

Este es un proyecto de tienda online desarrollado con **React**, que incluye:

- 🛍️ Carrito de compras con `Context API`
- 📦 CRUD completo de productos y usuarios
- 👥 Manejo de sesiones (login, registro, roles)
- ⚙️ Panel de administración
- 🗃️ Base de datos simulada con **JSON Server**

---

## 🚀 Características principales

- ✅ Vista de productos desde base de datos local
- ✅ Carrito con suma/resta de cantidades y total dinámico
- ✅ Login y Registro de usuarios con roles (`admin` y `user`)
- ✅ CRUD de productos: agregar, editar, eliminar
- ✅ CRUD de usuarios: agregar, editar, eliminar
- ✅ Panel de administración visible solo para el admin
- ✅ Navegación con `React Router`
- ✅ Estado global del carrito con `CartContext`

---

## 🧩 Integraciones UI y UX

- **React Icons:** Se incorporaron íconos intuitivos para mejorar la usabilidad y apariencia de la interfaz.
- **React Toastify:** Se implementaron notificaciones de éxito y error para mejorar la experiencia del usuario.
- **React Helmet:** Se agregaron etiquetas `<title>` y `<meta>` dinámicas para mejorar el SEO.
- **Accesibilidad:** Se incorporaron atributos ARIA en botones e inputs para compatibilidad con lectores de pantalla.

## 📁 Estructura del proyecto

```
src/
├── App.jsx
├── main.jsx
├── context/
│   └── CartContext.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Cart.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── ProductManager.jsx
│   └── UserManager.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Checkout.jsx
│   ├── CartCheckout.jsx
│   └── AdminPanel.jsx
db.json
```

---

## ⚙️ Requisitos previos

- Node.js instalado
- Git instalado

---

## 💽 Instalación y ejecución

1. **Clonar el repositorio**

```bash
git clone https://github.com/Ricardo-Torales/Proyecto-React.git
cd Proyecto-React
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Inicializar el proyecto de Node (si aún no está)**

```bash
npm init -y
```

4. **Instalar JSON Server**

```bash
npm install json-server --save-dev
```

5. **La `db.json` en la raíz del proyecto**

```json
{
  "users": [],
  "products": [],
  "cart": []
}
```

6. **Correr el servidor JSON en otra terminal**

```bash
npx json-server --watch db.json --port 3001
```

7. **Ejecutar la app React**

```bash
npm run dev
```

> Vite ejecuta la app en `http://localhost:5173`  
> JSON Server ejecuta en `http://localhost:3001`

---

## 👤 Usuario Admin por defecto

```json
{
  "id": "1",
  "name": "Admin",
  "email": "admin@mail.com",
  "password": "Admin",
  "role": "admin"
}
```
## 📄 Licencia

```
Este proyecto es de uso libre para fines educativos.
