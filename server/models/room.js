var mongoose = require('mongoose')
var Schema = mongoose.Schema

var roomSchema = new Schema({
    "name": { type: String, required: true, unique: true },
    "owner": {
        type: 'String'
    },
    "messages": [],
    "users": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

mongoose.model('Room', roomSchema)
