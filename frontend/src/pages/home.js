import React, { useEffect } from "react";
import TodoDetail from "../components/todoDetail";
import TodoForm from "../components/todoForm";
import { useTodoContext } from "../hooks/useTodoContext";

const Home = () => {
  const { todo, dispatch } = useTodoContext();

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch("/api/todo");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODO", payload: json });
      }
    };

    fetchTodo();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workout">
        {todo.length === 0 ? (
          <p>No more Task</p>
        ) : (
          todo.map((item) => <TodoDetail item={item} key={item._id} />)
        )}
      </div>
      <TodoForm />
    </div>
  );
};

export default Home;
