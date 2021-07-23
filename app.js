const express = require('express');
const path = require('path');
const http = require('http');
const expressSession = require('express-session')
const consign = require('consign');
const cors = require('cors');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const methodOveride = require('method-override');
const socketIO = require('socket.io');

const config = require('./config');
const error = require('./middlewares/error');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const store = new expressSession.MemoryStore();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  store,
  name: config.sessionKey,
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true
}))
app.use(cookieParser('ntalk'))
app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: 'ntalk'
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());
app.use(methodOveride('_method'));

io.use((socket, next)=>{
  const cookieData = socket.request.headers.cookie;
  const cookieObj = cookie.parse(cookieData);
  const sessionHash = cookieObj[config.sessionKey] || '';
  const sessionID = sessionHash.split('.')[0].slice(2);
  store.all((err, sessions)=>{
    const currentSession = sessions[sessionID];
    if(err || !currentSession){
      return next(new Error('Acesso negado!'));
    }
    socket.handshake.session = currentSession;
    return next();
  })
})

consign({})
  .include('database/models')
  .then('controllers')
  .then('routes')
  .then('events')
  .into(app, io);
  
app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, ()=>{
  console.log('Listening port 3000');
})

module.exports = app;
