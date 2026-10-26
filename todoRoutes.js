import express from "express";

import {
    createTodo,
    readTodos,
    readTodosById,
    updateTodo,
    deleteTodo
} from "../Controllers/TodoController.js";

import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/", authenticate, createTodo);

router.get("/", authenticate, readTodos);

router.get("/:id", authenticate, readTodosById);

router.put("/:id", authenticate, updateTodo);

router.delete("/:id", authenticate, deleteTodo);

export default router;