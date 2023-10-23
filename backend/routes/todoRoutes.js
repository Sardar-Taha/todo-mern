const express = require("express");
const {
  allTodo,
  singleTodo,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controller/todoController");

const router = express.Router();

//all route
router.get("/", allTodo);

//single route
router.get("/:id", singleTodo);

//post
router.post("/", createTodo);

//delete
router.delete("/:id", deleteTodo);

//delete
router.patch("/:id", updateTodo);

module.exports = router;
