import React, { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text }]);
    setText('');
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h4 className="fw-bold mb-3">Daftar Catatan (Todo)</h4>
      <form onSubmit={addTodo} className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Tambah catatan..."
        />
        <button type="submit" className="btn btn-primary">Tambah</button>
      </form>

      <ul className="list-group">
        {todos.length === 0 && (
          <li className="list-group-item text-muted">Belum ada catatan.</li>
        )}
        {todos.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.text}
            <button className="btn btn-outline-danger btn-sm" onClick={() => removeTodo(item.id)}>
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}