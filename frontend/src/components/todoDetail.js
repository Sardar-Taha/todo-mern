import React from "react";
import { useTodoContext } from "../hooks/useTodoContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TodoDetail = ({ item }) => {
  const { dispatch } = useTodoContext();

  const handleClick = async () => {
    const response = await fetch("/api/todo/" + item._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };

  return (
    <>
      <div className="workout-details">
        <p>{item.heading}</p>
        <p>{item.text}</p>
        <p>
          {formatDistanceToNow(new Date(item.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span onClick={handleClick}>delete</span>
      </div>
    </>
  );
};

export default TodoDetail;
