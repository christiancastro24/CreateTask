const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UsersController')
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

const imageUpload = require('../helpers/image-upload')

router.post('/register', cors(corsOpts), UserController.createAccount)
router.post('/login', cors(corsOpts), UserController.login)
router.get('/users', cors(corsOpts), UserController.getUsers)
router.get('/users/:id', cors(corsOpts), UserController.getAccountUser)
router.patch('/update/:id', cors(corsOpts), imageUpload.single("image"), UserController.updateUser)
router.delete('/users/:id',  cors(corsOpts), UserController.deleteUser)

module.exports = router;