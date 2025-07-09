import { useEffect, useState } from 'react';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = () => {
    const user = { ...newUser, id: crypto.randomUUID() };

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(() => {
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', password: '', role: 'user' });
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter(u => u.id !== id)));
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  const handleSave = () => {
    fetch(`http://localhost:3001/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUser)
    }).then(() => {
      setUsers(users.map(u => (u.id === editUser.id ? editUser : u)));
      setEditUser(null);
    });
  };

  return (
    <div>
      <h3>➕ Agregar nuevo usuario</h3>
      <input value={newUser.name} placeholder="Nombre" onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
      <input value={newUser.email} placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
      <input value={newUser.password} placeholder="Contraseña" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
      <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button onClick={handleAddUser}>Agregar</button>

      <h3>👥 Usuarios existentes</h3>
      {users.map(u => (
        <div key={u.id} style={styles.item}>
          {editUser?.id === u.id ? (
            <>
              <input value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
              <input value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
              <input value={editUser.password} onChange={(e) => setEditUser({ ...editUser, password: e.target.value })} />
              <select value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <button onClick={handleSave}>Guardar</button>
            </>
          ) : (
            <>
              <strong>{u.name}</strong> - {u.email} - ({u.role})
              <br />
              Contraseña: {u.password}
              <br />
              <button onClick={() => handleEdit(u)}>Editar</button>
              <button onClick={() => handleDelete(u.id)}>Eliminar</button>
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
