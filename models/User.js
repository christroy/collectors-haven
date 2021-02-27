const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified ( or is new )
    if (!user.isModified('password')) return next();

    // generate salt
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = model('User', UserSchema);

module.exports = User;