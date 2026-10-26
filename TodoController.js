import Todo from "../models/TodoModel.js";


// ==================== CREATE TODO ====================

const createTodo = async (req, res) => {

    try {

        const newTodo = await Todo.create({
            todo: req.body.todo,
            category: req.body.category,
            completed: req.body.completed,
            user: req.user.userId
        });

        res.status(201).json({
            message: "Todo created successfully",
            data: newTodo
        });

    }
    catch (err) {

        res.status(500).json({
            message: "Todo creation failed"
        });

    }
};


// ==================== READ ALL USER TODOS ====================

const readTodos = async (req, res) => {

    try {

        const filter = {
            user: req.user.userId
        };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.completed !== undefined) {
            filter.completed = req.query.completed === "true";
        }

        const todos = await Todo.find(filter);

        res.status(200).json({
            message: "Todos fetched successfully",
            data: todos
        });

    }
    catch (err) {

        res.status(500).json({
            message: "Todos fetching failed"
        });

    }
};


// ==================== READ TODO BY ID ====================

const readTodosById = async (req, res) => {

    try {

        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (todo) {

            res.status(200).json({
                message: "Todo fetched successfully",
                data: todo
            });

        }
        else {

            res.status(404).json({
                message: "Todo not found",
                data: null
            });

        }

    }
    catch (err) {

        res.status(500).json({
            message: "Todo fetch failed"
        });

    }
};


// ==================== UPDATE TODO ====================

const updateTodo = async (req, res) => {

    try {

        const updatedTodo = await Todo.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            {
                todo: req.body.todo,
                category: req.body.category,
                completed: req.body.completed
            },
            {
                new: true
            }
        );

        if (updatedTodo) {

            res.status(200).json({
                message: "Todo updated successfully",
                data: updatedTodo
            });

        }
        else {

            res.status(404).json({
                message: "Todo not found"
            });

        }

    }
    catch (err) {

        res.status(500).json({
            message: "Todo update failed"
        });

    }
};


// ==================== DELETE TODO ====================

const deleteTodo = async (req, res) => {

    try {

        const deletedTodo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (deletedTodo) {

            res.status(200).json({
                message: "Todo deleted successfully",
                data: deletedTodo
            });

        }
        else {

            res.status(404).json({
                message: "Todo not found"
            });

        }

    }
    catch (err) {

        res.status(500).json({
            message: "Todo deletion failed"
        });

    }
};


export {
    createTodo,
    readTodos,
    readTodosById,
    updateTodo,
    deleteTodo
};