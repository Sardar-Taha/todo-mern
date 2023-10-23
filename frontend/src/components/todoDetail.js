import React, { useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { BsTrash, BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TodoDetail = ({ item }) => {
  const { dispatch } = useTodoContext();
  const [border, setBorder] = useState(false);
  const [trash, setTrash] = useState(false);

  const notify = () => toast("Task Completed!");
  const notifyTwo = () => toast("Task Pending!");
  const deleteTask = () => toast("Task Deleted!");

  const handleClick = async () => {
    deleteTask();
    const response = await fetch("/api/todo/" + item._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };

  const handleComplete = () => {
    setBorder(!border);
    notify();
  };

  const handleCompleteTwo = () => {
    setBorder(!border);
    notifyTwo();
  };

  const handleTrash = () => {
    setTrash(!trash);
  };

  const handleTrashLeave = () => {
    setTrash(false);
  };

  return (
    <>
      <div className={`workout-details `}>
        <div>
          <p>{item.heading}</p>
          <p>{item.text}</p>
          <p className="text">
            {formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div>
          {border ? (
            <AiFillCheckCircle
              className="checkIcon"
              onClick={handleCompleteTwo}
            />
          ) : (
            <AiOutlineCheckCircle
              className="checkIcon"
              onClick={handleComplete}
            />
          )}

          {trash ? (
            <BsTrashFill
              className="trashIcon"
              onClick={handleClick}
              onMouseLeave={handleTrashLeave}
            />
          ) : (
            <BsTrash
              onClick={handleClick}
              className="trashIcon"
              onMouseEnter={handleTrash}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TodoDetail;
