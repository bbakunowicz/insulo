require('dotenv').config();
const jwt = require('jsonwebtoken');
const genToken = require('../utils/genToken');
const getUser = require('../data/users');

const err_res = { 
    errors: [{ msg: 'Not authenticated' }],
    errcode: 'autherr_not_authenticated',
}

module.exports = (req, res, next) => {
    const accessToken = req.cookies.AT;

    if (!accessToken) {
        return res.status(403).json(err_res);
    }

    try {
        jwt.verify(accessToken, process.env.AT_SECRET, (error, decoded) => {
            if (error) {
                if (error.name='TokenExpiredError')
                {
                    const refreshToken = req.cookies.RT;

                    if (!refreshToken) {
                        return res.status(403).json(err_res);
                    }

                    jwt.verify(refreshToken, process.env.RT_SECRET, (error, decoded) => {
                        if (error) {
                            console.error(`${error.message}:`);
                            console.error(refreshToken);
                            return res.status(403).json(err_res);  
                        }
                        else {
                            const {email, roles} = jwt.decode(accessToken);
                            const user = getUser(email);

                            if (JSON.stringify(roles.sort()) ===  JSON.stringify(user.roles.sort())) {

                                const payload = { email: email, roles: user.roles };

                                genToken.genAccessToken(res, payload);
                
                                const rTime = new Date(0);
                                rTime.setUTCSeconds(decoded.exp);
                                const cTime = new Date();
                                if ((rTime.getTime() - cTime.getTime()) < (Number(process.env.RT_PERIOD) - Number(process.env.RT_RENEW)) * 1000) {
                                    genToken.genRefreshToken(res);
                                }
                                
                                req.email = payload.email;
                                req.roles = payload.roles;
                                next();
                            }
                            else {
                                return res.status(403).json(err_res);
                            }
                        }
                    })
                }
                else {
                    console.error(`${error.message}:`, jwt.decode(accessToken));
                    return res.status(403).json(err_res);
                }
            } else {
                req.email = decoded.email;
                req.roles = decoded.roles;
                next();
            }
        });
      } catch (err) {
        console.error('Auth: token verification error: ', err);
        res.status(500).json(err_res);
    }

};
