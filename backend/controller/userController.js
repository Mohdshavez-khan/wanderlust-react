const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


module.exports.postSignup = async (req, res, next) => {
    try {
        let { email, username, password } = req.body.user;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: "User Registred Successfully" })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ message: err.message })
    }
};

module.exports.postLogin = async (req, res, next) => {

    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid Email or Password" });
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        };
        const token = jwt.sign(
            {
                id : user._id,
                email : user.email,
                username : user.username
            },
            process.env.JWT_TOKEN,
            {
                expiresIn : "7d"
            }
        );
  
        res.status(200).json({
            message: "Login success",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
       
    } catch (err) {
        next(err)
    }

};

