const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const genToken = require('../utils/genToken');
const getUser = require('../data/users');
const {sample} = require('../data/sample');

const err_res = { 
    errors: [{ msg: 'Invalid Credentials' }],
    errcode: 'autherr_invalid_credentials',
}

router.post('/auth', [
        check('email', 'Please include a valid email.').isEmail(),
        check('password', 'Password must be at least 5 characters long.').isLength({ min: 5 })
    ],
    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(401).json({ errors: errors.array(), errcode: 'autherr_wrong_params' });
        }
        
        const { email, password } = req.body;

        try {
            const user = getUser(email);

            if (!user) {
                if (typeof res != 'undefined') {
                    return res
                    .status(401)
                    .json(err_res);
                }
                else {
                    console.error('Invalid Credentials');
                }
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                if (typeof res != 'undefined') {
                    return res
                    .status(401)
                    .json(err_res);
                }
                else {
                    console.error('Invalid Credentials');
                }
            }

            const payload = { email: email, roles: user.roles };

            genToken.genAccessToken(res, payload);
            genToken.genRefreshToken(res);

            return res.json(payload);

        } catch (err) {
            console.error(err.message);
            if (typeof res === 'object') {
                res.status(500).send('Server error');
            }
        }
    }
);

router.post('/status', function (req, res, next) {
    res.send('/status');
});

router.post('/refresh', function (req, res, next) {
    res.send('/refresh');
});

router.post('/register', function (req, res, next) {
    res.send('/register');
});

router.get('/test', [authentication, authorization(['user']),
    check('email', 'Please include a valid email.').isEmail()], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array(), errcode: 'autherr_wrong_params' });
    }

    res.json({sample});
});

module.exports = router;
