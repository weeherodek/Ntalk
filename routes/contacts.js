const authenticate = require('../middlewares/authenticate');

module.exports = (app)=>{
    const {contacts} = app.controllers;
    app.get('/contatos', authenticate, contacts.index);
    app.get('/contato/:id', authenticate, contacts.show);
    app.post('/contato', authenticate, contacts.create);
    app.get('/contato/:id/editar', authenticate, contacts.edit);
    app.put('/contato/:id', authenticate, contacts.update);
    app.delete('/contato/:id', authenticate, contacts.delete);
};