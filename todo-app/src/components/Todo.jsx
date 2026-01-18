import React, { useEffect , useState} from 'react';

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  // save todos
  useEffect (() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

 //add todo

const handleAdd = (e) => {
    e.preventDefault();
    if(newTodo.trim() === "") {
        alert("Please enter a todo item");
        return ; 

    }
    const todo = { id : Date.now() , text : newTodo };
    //Update state
    setTodos ( [...todos , todo]);
    setNewTodo("");
};
//delete todo
const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
};
 return (
    <div
      style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}
    >
      <h1>My To-Do List</h1>
      <form onSubmit={handleAdd}>
        <input
          style={{ padding: "8px", width: "70%" }}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          style={{ padding: "8px 12px", marginLeft: "10px", marginTop: "10px" }}
        >
          Add Todo
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
        {todos.map((todo) => {
          return (
            <li
              onClick={() => handleDelete(todo.id)}
              style={{
                background: "#f5f5f5",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "4px",
              }}
              key={todo.id}
            >
              {todo.text}
              <button>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Todo;

