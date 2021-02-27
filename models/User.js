const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema (
    {
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => Types.ObjectId
        // },
        email: {
            type: String,
            required: 'An email is Required!',
            trim: true,
            match: /^[a-zA-Z0-9.!?_-]+@[a-zA-Z-]+(?:\.[a-zA-Z0-9]+)$/,
            unique: true
        },
        username: {
            type: String,
            required: 'A Username is Required',
            trim: true,
        },
        password: {
            type: String,
            required: 'A Password is Required',
            match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$/,
            min: 8,
            max: 12
        }
    }
);

const User = model('User', UserSchema);

module.exports = User;