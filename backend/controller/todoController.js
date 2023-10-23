const Todo = require("../model/todoModel");
const mongoose = require("mongoose");

const allTodo = async (req, res) => {
  const todo = await Todo.find({}).sort({ create: -1 });

  res.status(200).json(todo);
};

const singleTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such todo" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "No Such todo" });
  }
  res.status(200).json(todo);
};

const createTodo = async (req, res) => {
  const { heading, text } = req.body;

  let emptyFields = [];

  if (!heading) {
    emptyFields.push("Heading");
  }
  if (!text) {
    emptyFields.push("Text");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const todo = await Todo.create({ heading, text });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such todo" });
  }

  const todo = await Todo.findByIdAndDelete({ _id: id });

  if (!todo) {
    return res.status(404).json({ error: "No Such todo" });
  }
  res.status(200).json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such todo" });
  }

  const todo = await Todo.findOneAndUpdate(
    { id },
    {
      ...req.body,
    }
  );

  if (!todo) {
    return res.status(404).json({ error: "No Such todo" });
  }
  res.status(200).json(todo);
};

module.exports = { allTodo, singleTodo, createTodo, deleteTodo, updateTodo };
