import React, { useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import { toast } from "react-toastify";

const TodoForm = () => {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useTodoContext();
  const [emptyFields, setEmptyFields] = useState([]);

  const taskAdded = () => toast("New Task Added!");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = { heading, text };

    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);

      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setEmptyFields([]);
      setHeading("");
      setText("");
      setError(null);
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  const handleToast = () => {
    if (heading.length >= 1 || text.length >= 1) {
      taskAdded();
    }
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Task</h3>

        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setHeading(e.target.value)}
          value={heading}
          className={emptyFields.includes("Heading") ? "error" : ""}
        />

        <label>About</label>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className={emptyFields.includes("Text") ? "error" : ""}
        />
        <button onClick={handleToast}>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default TodoForm;
