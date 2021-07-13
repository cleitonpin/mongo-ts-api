import { User } from "../models/Users/users.models";
import { IUser } from "../models/Users/users.type";

export default {
    render(user: IUser) {
        return {
            _id: user._id,
            email: user.email,
            username: user.username,
            phone_number: user.phone_number,
            img_url: user.img_url,
            createdAt: user.createdAt
        }
    }
}