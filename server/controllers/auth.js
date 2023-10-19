import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "../models/User.js";

//function should be asyncronous as we are calling to mongo db database
export const register = async (req, res) => {

    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;        //object desctructuring

        const salt = await bcrypt.genSalt(); //generating salt await as it also return a promise
        const passwordHash = await bcrypt.hash(password, salt);  //password hasing using salt
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000) //generating random number
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const login = async (req, res) => {
    console.log("hello");
        try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password);//checking if passoword is correct
            if (!isMatch) {
                res.status(400).json({ message: "Invalid Credentials" });
            }
            else {
                const token = Jwt.sign({id:user._id},process.env.JWT_SECRET);
                delete user.password;
                res.status(200).json({token,user})

            }
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}