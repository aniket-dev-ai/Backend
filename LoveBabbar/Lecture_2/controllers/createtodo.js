const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
    try {
      console.log(req.body); // Debugging purpose
      const { title, description } = req.body;
      const response = await Todo.create({ title, description });
      res.status(200).json({
        success: true,
        data: response,
        message: "Entry Created Successfully",
      });
    } catch (err) {
      console.log(err); // Debugging error
      res.status(500).json({
        success: false,
        data: null,
        message: "An error occurred while creating the entry",
      });
    }
  };
  
