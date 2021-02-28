require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.genToken = (res, payload, secret, tokenExpiresIn, cookieName, cookieExpiresIn) => {
    const token = jwt.sign(payload, secret, { expiresIn: Number(tokenExpiresIn) });
    res.cookie(cookieName, token, {
        maxAge: Number(cookieExpiresIn) *1000,
        //secure: true,         // with https only
        httpOnly: true          // inaccessible to the JavaScript
    });
}

exports.genAccessToken = (res, payload) => {
    exports.genToken(res, payload, process.env.AT_SECRET, process.env.AT_PERIOD, 'AT', process.env.RT_PERIOD);
}

exports.genRefreshToken = (res, payload) => {
    exports.genToken(res, {}, process.env.RT_SECRET, process.env.RT_PERIOD, 'RT', process.env.RT_PERIOD);
}
