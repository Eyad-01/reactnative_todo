import React, { useState, useEffect } from 'react';

// interface Todo {
//   id: string;
//   text: string;
// }
interface User{
    id: string;
    email: string;
    password: string;
    googleId:string;
    secret:string;
}


const TodoApp = () => {
  const [todos, setTodos] = useState<User[]>([]);
  const [newTodo, setNewTodo] = useState('');
  // const [editingTodo, setEditingTodo] =  useState<User|"">("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const headers = new Headers({
        'Content-Type': 'application/json',

      });
      const response = await fetch('http://localhost:3000/todos', {headers})
      console.log(response)
      const data = await response.json();
      setTodos(data);
    } catch (error) {
        console.log(error);
    }
  };

  const handleAddTodo = async () => {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: newTodo,
      }),
    });
    console.log(response)
    const data = await response.json();
    setTodos([...todos, data]);
    setNewTodo('');
  };

  const handleEditTodo = async (todo: User) => {
    const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // secret: editingTodo?.secret,
      }),
    });
    const data = await response.json();
    setTodos(todos.map(t => t.id === data.id ? data : t));
    // setEditingTodo(null);
  };

  const handleDeleteTodo = async (todo: User) => {
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter(t => t.id !== todo.id));
  };

  const renderTodo = (todo: User) => {
    return (
      <div key={todo.id}>
        {/*{editingTodo.id === todo.id ? (*/}
          <>
            <input key={todo.id} value={todo.secret} />
            <button key={todo.id} onClick={() => handleEditTodo(todo)}>Edit</button>
        {/*) : (*/}
        {/*    <button onClick={() => setEditingTodo(todo)}>Edit</button>*/}
            <button key={todo.id} onClick={() => handleDeleteTodo(todo)}>Delete</button>
          </>
        {/*)}*/}
      </div>
    );
  };
  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleAddTodo}>
        <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map(renderTodo)}
    </div>
  );
};

export default TodoApp;