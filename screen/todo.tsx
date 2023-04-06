import React, { useState, useEffect } from 'react';

interface  User {
  id:       string;
  email:    string;
  password: string;
  googleId: string;
  secret:   string;
}


const TodoApp = () => {
  const [todos, setTodos] = useState<User[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] =  useState<User|"">("");

  useEffect(() => {
    fetchTodos();
  }, todos);

  const fetchTodos = async () => {
    try {
      const headers = new Headers({
        'Content-Type': 'application/json',

      });
      const response = await fetch('http://localhost:3000/todos', {headers})
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
      email:"reactivenative@yopmail.com" ,
      password:"123" ,
      googleId:"null" ,
      secret:newTodo,
    }),
    });
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
      // email:editingTodo?.email ,
      // password:editingTodo?.password ,
      // googleId:editingTodo?.googleId ,
      // secret:editingTodo?.secret
      }),
    });
    const data = await response.json();
    setTodos(todos.map(t => t.id === data.id ? data : t));
    setEditingTodo(null);
  };

  const handleDeleteTodo = async (todo: User) => {
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter(t => t.id !== todo.id));
  };

  return <div>
    <h1>Todo App</h1>
    <form>
      <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
      <button type="submit" onClick={handleAddTodo}>Add Todo</button>
    </form>
    <div>
    {todos.map((todo,index) => <div key={index}>
      {/*{editingTodo.id === todo.id ? (*/}
        <>
          <input key={index} value={todo.secret} onChange={e => todo.secret=e.target.value}/>
          <button key={index} onClick={() => handleEditTodo(todo)}>Edit</button>
      {/*) : (*/}
          <button key={index} onClick={() => handleDeleteTodo(todo)}>Delete</button>
        </>
      {/*)}*/}
    </div>)}
      </div>
  </div>;
};

export default TodoApp;