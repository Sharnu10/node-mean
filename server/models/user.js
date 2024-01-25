const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// User schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        requied: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        requied: true
    }
});

UserSchema.statics.getUserByUsername = (username, callBack) => {
    let query = { username: username };
    User.findOne(query, callBack);
}

UserSchema.statics.addUser = (newUser, callBack) => {
    User.getUserByUsername(newUser.username, (err, user) =>{
        if(err) return callBack({ message: "There was an error on getting  the user"});

        if(user) {
            let error = { message: "Username is already in use."};
            return callBack(error);
        } else {
            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(newUser.password, salt, (err, hash) => {
                    if(err) return callBack({ message: "There was an error registering the new user."});

                    newUser.password = hash;
                    newUser.save(callBack);
                });
            });
        }
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
