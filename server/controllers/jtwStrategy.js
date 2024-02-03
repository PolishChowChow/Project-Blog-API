const User = require("../models/User");

require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || "dsadsa",
}
module.exports = new JwtStrategy(opt, async(jwt_payload, done) => {
    const user = await User.findOne({username: jwt_payload.username})
    if(user !== undefined && user !== null){
        return done(null, true)
    }
    return done(null, false)
})