module.exports = (app) =>{
    const User = app.database.models.user;

    const HomeController ={
        index(req,res){
            res.render('home/index');
        },
        async login(req,res){
            const { user } = req.body;
            const { email, name } = user;
            try {
                const isUser = await User.findOne({email});
                if(isUser){
                    req.session.user = isUser;
                    return res.redirect('/contatos');
                }
                 await User.create({user});
                 return res.redirect('/contatos');
            } catch (error) {
                res.redirect('/');
            }
        },
        logout(req,res){
            req.session.destroy();
            res.redirect('/');
        }
    }
    return HomeController;
}