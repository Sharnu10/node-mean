const express = require('express');
const User = require('../models/user');
const router = express.Router();

// register
router.get('/', (req, res, next) => {
    res.send('Hi server is up!');
});

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

module.exports = router;