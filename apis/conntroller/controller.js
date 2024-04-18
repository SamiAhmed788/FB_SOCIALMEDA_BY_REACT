import bcrypt from "bcrypt"
import User from "../model/uder.js"

export const signupController = async (req, res) => {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
    });
    
    user.save()

        .then((savedUser) => {
          
            res.status(200).json(savedUser);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

export const loginController = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json("USER NOT FOUND");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("Invalid password");
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

export const logoutController = (req, res) => {
    
    res.json({
        status: true,
        message: "Logout Successfully"
    })
}
export const forgetPasswordController = (req, res) => {
    res.json({
        status: true,
        message: "forget Password Successfully"
    })
}
