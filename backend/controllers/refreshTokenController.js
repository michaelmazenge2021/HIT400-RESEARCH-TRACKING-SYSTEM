const User = require('../model/User');
const jwt = require('jsonwebtoken');
const Stuff = require('../model/Stuff');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    const userDetail = await Stuff.findOne({ID_number: foundUser.username})
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(userDetail.roles);
            
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "firstname": decoded.firstname,
                        "lastname": decoded.lastname,
                        "department": decoded.department,
                        "roles": roles,
                        
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ accessToken})
        }
    );
}

module.exports = { handleRefreshToken }