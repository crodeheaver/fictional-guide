var mongoose = require('mongoose');
var Room = mongoose.model('Room');

module.exports = function(io) {
    var room = {};
    io.on('connection', function(socket) {
        console.log('new user');
        socket.on('newmessage', function(message) {
            Room.findOneAndUpdate({
                    name: socket.room
                }, {
                    $addToSet: {
                        messages: message
                    }
                },
                function() {
                    console.log('message')
                    io.sockets.in(socket.room).emit('message', message);
                })
        })

        socket.on('getusers', function() {

            io.sockets.in(socket.room).emit('updateusers', room[socket.room]);
        })

        socket.on('adduser', function(data) {
            console.log('adduser', data)
                // store the username in the socket session for this client
            socket.username = data.username;
            // store the room name in the socket session for this client
            socket.room = data.room;
            // send client to room 1
            socket.join(data.room);

            if (room[socket.room] === undefined)
                room[socket.room] = [];
            room[socket.room].push(data.username);
            console.log('users in ', socket.room, ':', room[socket.room])
            io.sockets.in(socket.room).emit('updateusers', room[socket.room]);
            // echo to client they've connected
            //socket.emit('updateusers', 'SERVER', 'you have connected to room1');
            // echo to room 1 that a person has connected to their room
            //socket.broadcast.to(data.room).emit('message', {
            //    sender: 'Server',
            //    text: data.username + ' has connected to this room'
            // });
            //socket.emit('updaterooms', rooms, 'room1');
        });

        socket.on('changeroom', function(newroom) {
            // leave the current room (stored in session)
            socket.leave(socket.room);
            // join new room, received as function parameter
            socket.join(newroom);
            if (room[newroom] == undefined)
                room[newroom] = [];
            console.log(room[socket.room])
            var index = room[socket.room].indexOf(socket.username);
            room[socket.room].splice(index, 1);
            socket.broadcast.to(socket.room).emit('updateusers', room[socket.room]);
            // update socket session room title
            socket.room = newroom;
            console.log(room[socket.room])
            room[socket.room].push(socket.username);
            console.log('users in ', socket.room, ':', room[socket.room])
            io.sockets.in(socket.room).emit('updateusers', room[socket.room]);
        })
        socket.on('removeuser', function() {
            console.log('remove user', socket.username)
            var index = room[socket.room].indexOf(socket.username);
            room[socket.room].splice(index, 1);
            io.sockets.in(socket.room).emit('updateusers', room[socket.room]);
        })

        socket.on('newroom', function(data) {
            console.log('newroom')

            new Room(data)
                .save()
                .then(function(room) {
                    console.log('saved')
                    io.emit('addroom', data);
                })
                .catch(function(err) {
                    console.log(err)
                });

            //io.emit('addroom', data);
        })
        socket.on('disconnect', function() {
            console.log('disconnect')
                // remove the username from global usernames list
            if (room[socket.room] === undefined)
                room[socket.room] = [];
            var index = room[socket.room].indexOf(socket.username);
            room[socket.room].splice(index, 1);
            // update list of users in chat, client-side
            console.log('users in ', socket.room, ':', room[socket.room])
            io.sockets.emit('updateusers', room[socket.room]);
            socket.leave(socket.room);
        });
    });
}
