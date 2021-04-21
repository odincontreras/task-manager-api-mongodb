const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes')
const isAuth = require("../middleware/is-auth");

router.get('/', isAuth, notesController.getTodo)

router.post('/addtodo', isAuth, notesController.addTodo)

router.delete('/delete-todo', isAuth, notesController.deleteTodo)

router.patch('/update-todo', isAuth, notesController.updateTodo)

module.exports = router;
