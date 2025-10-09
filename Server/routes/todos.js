const express = require("express");
const router = express.Router();
const Todos = require("../models/todos");
// const { router: userRouter, handleLoginCheck } = require("./users");
const { handleLoginCheck } = require("./users");
// Get todos for user role
// router.get("/user", handleLoginCheck, async (req, res) => {
//   try {
//     let todos = await Todos.find().populate("user", "username email role");

//     console.log(todos);
//     todos = todos.filter((todo) => todo.user.role === "user");
//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

router.get("/user", handleLoginCheck, async (req, res) => {
  try {
    const todos = await Todos.find({
      $and: [{ user: req.user.userId }, { completedStatus: false }],
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// fetching all the completed task of loggedin User
router.get("/user/completedTodos", handleLoginCheck, async (req, res) => {
  try {
    // console.log(req.user);
    let data = await Todos.find({
      $and: [{ completedStatus: true }, { user: req.user.userId }],
    });
    console.log(data);

    console.log("working");
    res.json({ data: data });
  } catch (error) {
    console.log(
      "some thing went wrong during api call or fetching data ",
      error
    );
    res.status(500).json({ message: "internal server error" });
  }
});
// single User details

router.get("/user/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let { id } = req.params;
    let todo = await Todos.findById(id);
    console.log(todo);
    res.json(todo);
  } catch (err) {
    console.log("some errro accured ", err);
  }
});

// Get todos for admin role
router.get("/admin", handleLoginCheck, async (req, res) => {
  try {
    let todos = await Todos.find().populate("user", "username email role");
    todos = todos.filter((todo) => todo.user.role === "admin");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create todo
router.post("/", handleLoginCheck, async (req, res) => {
  const { title, description, dueDate, category } = req.body;
  if (!title || !description)
    return res
      .status(400)
      .json({ message: "Title and Description are required" });

  const newTodo = new Todos({
    title,
    description,
    dueDate,
    category,
    user: req.user.userId,
  });
  await newTodo.save();
  res.status(201).json({ message: "Todo created successfully", todo: newTodo });
});

// Update todo by user
router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, category, completedStatus } = req.body;
  try {
    const todo = await Todos.findById(id).populate("user");
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (todo.user.role !== "user")
      return res.status(403).json({ message: "Unauthorized" });

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.category = category || todo.category;
    todo.completedStatus = completedStatus ?? todo.completedStatus;

    await todo.save();
    res.json({ message: "Todo updated successfully", todo });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update todo by admin
router.put("/admin/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, category, completedStatus } = req.body;
  try {
    const todo = await Todos.findById(id).populate("user");
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (todo.user.role !== "admin")
      return res.status(403).json({ message: "Unauthorized" });

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.category = category || todo.category;
    todo.completedStatus = completedStatus ?? todo.completedStatus;

    await todo.save();
    res.json({ message: "Todo updated successfully", todo });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete todo by user
router.delete("/user/:id", handleLoginCheck, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todos.findById(id).populate("user");
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // Check if the user is authorized to delete
    if (todo.user.username !== req.user.username || todo.user.role !== "user") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await todo.deleteOne({ "todo.user.username": req.user.username });
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});
// Delete todo by admin
router.delete("/admin/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todos.findById(id).populate("user");
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.role !== "admin")
      return res.status(403).json({ message: "Unauthorized" });

    await todo.remove();
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/search", async (req, res) => {
  const { title } = req.query;

  try {
    const todos = await Todos.find({
      $and: [
        {
          title: { $regex: title, $options: "i" },
        },
      ],
    }).populate("user");

    console.log(todos);
    res.status(200).json({ data: todos });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Something went wrong during search" });
  }
});

// marks as done router

router.put("/user/:id/markdone", async (req, res) => {
  try {
    let { id } = req.params;
    console.log("for marks as done ", id);

    let makeMarksAsDone = await Todos.findOneAndUpdate(
      { _id: id },
      {
        completedStatus: true,
      }
    );
    console.log(makeMarksAsDone);
    res.status(200).json({ data: makeMarksAsDone });
  } catch (err) {
    res.status(500).json({ error: "Something went worng during updation " });
  }
});

// router.get("/user/completedTodos", handleLoginCheck, async (req, res) => {
//   try {
//     const todos = await Todos.find({
//       $and: [{ user: req.user.userId }, { completedStatus: false }],
//     });
//     consle.log(todos);
//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

module.exports = router;
