import { Request, Response } from "express";
import { User } from "../models/Users/users.models";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userView from '../views/user_view'
import { RESPONSE_STATUS } from "../utils/getResponseStatus";


class AuthController {

    authenticate = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const users = await User.findByEmail(email);
        //email: dawd
        const user = users[0];
        
        if (!user) return res.status(RESPONSE_STATUS.NOT_FOUND);

        const isValidPass = bcrypt.compare(password, user.password as string);

        if (!isValidPass) return res.status(RESPONSE_STATUS.NOT_FOUND);

        const token = jwt.sign({ id: user._id }, '02132ijdom2k10m@/231', { expiresIn: '1d' })
        
        return res.status(RESPONSE_STATUS.SUCESS).json({
            user: userView.render(user),
            token
        })
    }
}

export default new AuthController();