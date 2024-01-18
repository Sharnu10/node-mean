const express = require('express');
const router = express.Router();

// register
router.get('/', (req, res, next) => {
    res.send('HI');
});

module.exports = router;