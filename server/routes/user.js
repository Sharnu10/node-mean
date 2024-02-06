const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();

const User = require('../models/user');

// check server up
router.get('/', (req, res, next) => {
    res.send('Hi server is up!');
});

// register
router.post('/register', (req, res, next) => {
    let response = { success:  false };
    const { userName, password, confirmPassword } = req.body;
    console.log(req);
    
    if(password !== confirmPassword) { 
        let err = "The password don't match!";
        return next(err);
    } else {
        let newUser = new User({
            username: userName,
            password: password
        });

        User.addUser(newUser, (err, user) => {
            if(err) {
                response.message = err.message || 'Failed to register user';
                res.json(response);
            } else {
                response.success = true;
                response.message = 'User registed successfuly!',
                response.user = {
                    id: user._id,
                    username: user.username
                }
                console.log('[%s] registered user: ', user.username);
                res.json(response);
            }
        });
    }
});

// authenticate
router.post('/authenticate', (req, res, next) => {
    let response = { success: false };
    const { userName, password } = req.body;

    User.getUserByUsername(userName, (err, user) => {
         if(err) return next(err);

         if(user) {
             bcryptjs.compare(password, user.password, (err, result) => {
                 if(err) return next(err);
                 if(result) {
                     response.success = true;
                     response.message = 'User authenticated successfuly!';
                     response.user = {
                         id: user._id,
                         username: user.username
                     }
                     console.log('[%s] authenticated user: ', user.username);
                     return res.json(response);
                 } else {
                     response.message = 'The password is not correct!';
                 }
                 return res.json(response);
                })
            }
     });
})

module.exports = router;