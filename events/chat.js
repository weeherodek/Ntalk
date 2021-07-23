const redis = require('redis').createClient();

module.exports = (app, io) => {
    const onlines = {};
    io.on('connection', (client) => {
        const { session } = client.handshake;
        const { user } = session;

        onlines[user.email] = user.email;
        for (let email in onlines) {
            client.emit('notify-onlines', email);
            client.broadcast.emit('notify-onlines', email);
        }

        client.on('send-server', (hashOfTheRoom, msg) => {
            const newMessage = { email: user.email, room: hashOfTheRoom };
            const answer = `<b>${user.name}: </b> ${msg}<br>`;
            redis.lpush(hashOfTheRoom, answer);
            client.broadcast.emit('new-message', newMessage);
            io.to(hashOfTheRoom).emit('send-client', answer);
        })

        client.on('create-room', (hashOfTheRoom) => {
            session.room = hashOfTheRoom;
            client.join(hashOfTheRoom);
            const answer = `<b>${user.name}:</b> entrou.<br>`;
            redis.lpush(hashOfTheRoom, answer, () => {
                redis.lrange(hashOfTheRoom, 0, -1, (err, msgs) => {
                    msgs.forEach(() => {
                        io.to(hashOfTheRoom).emit('send-client', msg);
                    })
                })
            })
        })

        client.on('disconnect', () => {
            const { room } = session;
            const answer = `<b>${user.name}:</b> saiu.<br>`;
            delete onlines[user.email];
            redis.lpush(room, answer, ()=>{
                session.room = null;
                client.leave(room)
                client.broadcast.emit('notify-offlines', user.email);
                io.to(room).emit('send-client', answer);
            })
        })
    });
}