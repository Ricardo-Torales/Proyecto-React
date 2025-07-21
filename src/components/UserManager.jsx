import { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaSave, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => toast.error("Error al cargar los usuarios"));
  }, []);

  const validateUser = (user) => {
    if (!user.name.trim()) return 'El nombre es obligatorio.';
    if (!user.email.includes('@')) return 'El email no es válido.';
    if (user.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    return '';
  };

  const handleAddUser = () => {
    const validationError = validateUser(newUser);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    const user = { ...newUser, id: crypto.randomUUID() };

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(() => {
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      setError('');
      toast.success("Usuario agregado");
    }).catch(() => toast.error("Error al agregar usuario"));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' })
      .then(() => {
        setUsers(users.filter(u => u.id !== id));
        toast.info("Usuario eliminado");
      })
      .catch(() => toast.error("Error al eliminar usuario"));
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  const handleSave = () => {
    const validationError = validateUser(editUser);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    fetch(`http://localhost:3001/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUser)
    }).then(() => {
      setUsers(users.map(u => (u.id === editUser.id ? editUser : u)));
      setEditUser(null);
      setError('');
      toast.success("Usuario actualizado");
    }).catch(() => toast.error("Error al guardar cambios"));
  };

  return (
    <div>
      <h3>➕ Agregar nuevo usuario</h3>

      <input
        value={newUser.name}
        placeholder="Nombre"
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        value={newUser.email}
        placeholder="Email"
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        value={newUser.password}
        placeholder="Contraseña"
        type="password"
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>

      <button onClick={handleAddUser} title="Agregar usuario">
        <FaPlus /> Agregar
      </button>

      <h3>👥 Usuarios existentes</h3>
      {users.map(u => (
        <div key={u.id} style={styles.item}>
          {editUser?.id === u.id ? (
            <>
              <input
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
              <input
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              <input
                value={editUser.password}
                type="password"
                onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
              />
              <select
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <button onClick={handleSave} title="Guardar cambios">
                <FaSave /> Guardar
              </button>
            </>
          ) : (
            <>
              <strong>{u.name}</strong> - {u.email} - ({u.role})
              <br />
              Contraseña: {u.password}
              <br />
              <button onClick={() => handleEdit(u)} title="Editar usuario">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(u.id)} title="Eliminar usuario">
                <FaTrash />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  item: {
    marginBottom: '1rem',
    padding: '0.5rem',
    borderBottom: '1px solid #ccc'
  }
};

export default UserManager;
