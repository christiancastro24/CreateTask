const express = require('express')
const router = express.Router();
const TasksController = require('../controllers/TasksController')

const cors = require('cors')

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PATCH',
      'DELETE',
      'PUT'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };

router.post('/tasks', cors(corsOpts), TasksController.getTasks)
router.post('/createTask', cors(corsOpts), TasksController.createTasks)
router.get('/tasks/:id', cors(corsOpts), TasksController.getTask)
router.delete('/deleteTask/:id', cors(corsOpts), TasksController.deleteTask)


module.exports = router;