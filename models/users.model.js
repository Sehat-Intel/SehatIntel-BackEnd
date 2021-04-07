const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    role: {type: String, required: true},
    createdDate: { type: Date, default: Date.now },
    picture: { type: String }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

const User = mongoose.model('User', schema);

module.exports = User;