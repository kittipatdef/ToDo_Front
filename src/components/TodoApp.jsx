// src/components/TodoApp.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  // โหลด todos ตอนเปิดหน้าเว็บ → คงอยู่หลังรีเฟรช
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data); // กำหนด state จากข้อมูลที่ดึงจาก backend
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect จะทำงานแค่ครั้งเดียวตอน component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // เพิ่ม todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/todos`, { title: newTodo });
      setTodos([...todos, res.data]); // อัปเดตรายการหลังเพิ่ม
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  };

  // ลบ todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle completed
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/todos/${id}`, {
        completed: !completed,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: res.data.completed } : todo
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {/* ฟอร์มเพิ่ม Todo */}
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          placeholder="เพิ่มรายการใหม่..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addTodo}
        >
          เพิ่ม
        </button>
      </div>

      {/* แสดง Todo List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="mr-2"
                />
                <span className={`${todo.completed ? "line-through text-gray-500" : ""}`}>
                  {todo.title}
                </span>
              </div>
              <button
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteTodo(todo.id)}
              >
                ลบ
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoApp;
