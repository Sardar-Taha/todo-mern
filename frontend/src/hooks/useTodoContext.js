import { TodoContext } from "../context/todoContext";
import { useContext } from "react";

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
