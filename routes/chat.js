const authenticate = require('../middlewares/authenticate');

module.exports = (app) =>{
    const { chat } = app.controllers;
    app.get('/chat', authenticate, chat.index);
}