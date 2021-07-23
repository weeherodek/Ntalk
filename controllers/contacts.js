const { Types: { ObjectId } } = require('mongoose');

module.exports = (app)=>{
    const User = app.database.models.user;

    const ContactController = {
        async index(req,res){
            const { _id } = req.session.user;
            try {
                const user = await User.findById(_id);
                const { contacts } = user;
                res.render('contacts/index', { contacts, user })
            } catch (error) {
                res.redirect('/');
            }
        },
        async show(req,res){
            const { _id } = req.session.user; 
            const contactId = req.params.id;
            try {
                const user = await User.findById(_id)
                const { contacts } = user;
                const contact = contacts.find((ct)=>{
                    return ct._id.toString() === contactId;
                })
                res.render('contacts/show', {contact});
            } catch (error) {
                res.redirect('/');
            }
        },
        async create(req,res){
            const { contact } = req.body;
            const { _id } = req.session.user;
            const set = { $push: { contacts: contact} };
            try {
                await User.findByIdAndUpdate(_id,set)
                res.redirect('/contatos')
            } catch (error) {
                res.redirect('/');
            }
        },
        async edit(req,res){
            const { _id } = req.session.user;
            const contactId = req.params.id;
            try {
                const user = await User.findById(_id);
                const { contacts } = user;
                const contact = contacts.find((ct)=>{
                    return ct._id.toString() === contactId;
                })
                res.render('contacts/edit',  { contact, user});
            } catch (error) {
                res.redirect('/');
            }
        },
        async update(req,res){
            const contactId = req.params.id;
            const { contact } = req.body;
            const { user } = req.session;
            const where = { _id: user._id, 'contacts._id': contactId };
            const set = { $set: { 'contacts.$': contact } };
            try {
                await User.update(where,set);
                res.redirect('/contatos');
            } catch (error) {
                res.redirect('/');
            }
        },
        async delete(req,res){
            const contactId = req.params.id;
            const { _id } = req.session.user;
            const where = { _id };
            const set = {
                $pull: {
                    contacts: {_id: ObjectId(contactId)}
                }
            };
            try {
                await User.update(where,set)
                res.redirect('/contatos')
            } catch (error) {
                res.redirect('/');
            }
        }
    }
    return ContactController;
}