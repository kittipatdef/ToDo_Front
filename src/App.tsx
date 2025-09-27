import React from "react";
import TodoApp from "./components/TodoApp";
function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4"></h1>
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
