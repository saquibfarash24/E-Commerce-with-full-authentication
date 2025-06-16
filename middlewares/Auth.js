import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";


export const isAuthenticated = async (req, res, next) => {
    const token = req.header('Auth')

    if (!token) {
        return res.status(401).json({ message: "Unauthorize user token is missing", success: false });
    }
    const decoded = jwt.verify(token,process.env.JWT);
    const id = decoded.userId;

    let user = await User.findById(id);
    if (!user) {
        return res.status(401).json({ message: "Unauthorize user", success: false });
    }

    req.user = user;
    next();

}    