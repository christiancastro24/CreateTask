// Modulos externos
const express = require('express')
const app = express();
const conn = require('./db/conn')
const cors = require('cors')
const dotenv = require('dotenv');
const session = require('express-session');
const FileStore = require('session-file-store')(session)

// Modulos internos
const path = require('path')
const os = require('os');

// Models
const User = require('./models/User')
const Task = require('./models/Tasks')

// Rotas
const routesAuth = require('./routes/authRoutes')
const routesTasks = require('./routes/tasksRoutes')


dotenv.config();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

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

const PORT = process.env.PORT || 5000;

app.use(express.static('public'))

app.use(
    session({ 
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: path.join(os.tmpdir(), 'sessions'),
            // path: require('path').join(__dirname, './sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

app.use(routesAuth)
app.use(routesTasks)

app.use(cors(corsOpts));

app.get('/', (req, res) => {
     res.status(200).json({ message: "Bem vindo a API!"})
})

// salva sessão para resposta
app.use((req, res, next) => {
  if(req.session.idUser) {
      res.locals.session = req.session
  }

  next()
})



conn
.sync()
.then(_ => {
app.listen(PORT)})

.catch((err) => {
    consolelog(err)
})
