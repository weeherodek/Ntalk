const crypto = require('crypto')

module.exports = (app)=>{
    const ChatController ={
        index(req,res){
            const { room } = req.query;
            let hashOfTheRoom = room;
            if(!hashOfTheRoom){
                const timestamp = Date.now().toString();
                const md5 = crypto.createHash('md5');
                hashOfTheRoom = md5.update(timestamp).digest('hex');
            }
            res.render('chat/index', {room: hashOfTheRoom});
        }
    }
    return ChatController;
}