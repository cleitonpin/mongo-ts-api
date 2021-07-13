import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { readFileSync, unlink } from 'fs';
import { join } from 'path';
import * as yup from 'yup';
import firebase from '../config/firebase';
import { User } from "../models/Users/users.models";
import { RESPONSE_STATUS } from "../utils/getResponseStatus";
import userView from '../views/user_view';

//util.types.isDate


class UserController {
    
    index = async (req: Request, res: Response) => {
        try {
            const user = await User.find();
            

            console.log('Yes')
            return res.status(RESPONSE_STATUS.SUCESS).json({ users: user });
        } catch (e) {
            console.log(e);
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const { email, username, password, phone_number } = req.body;

            const userExists = await User.findByEmail(email);

            if(userExists.length > 0) {
                return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
                    message: 'User with this email already exists'
                })
            }
            
            const encryptedPass = await bcrypt.hash(password, 10);

            let schema = yup.object().shape({
                email: yup.string().required().email(),
                username: yup.string().required(),
                password: yup.string().required(),
                phone_number: yup.string().nullable(),
                img_url: yup.string().nullable()
            })

            const obj = {
                email: email,
                username: username,
                password: encryptedPass,
                phone_number: phone_number,
                img_url: null
            }
            const isValid = await schema.isValid(obj);

            if (!isValid) {
                return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
                    message: 'Validation Failed'
                });
            }

            const user = await User.create(obj);
            user.save();
            return res.status(RESPONSE_STATUS.CREATED).json({
                user: userView.render(user)
            });
        } catch (e) {
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error: e })
        }
    };

    upload = async (req: Request, res: Response) => { 

        const { _id } = req.params;
        const file: Buffer = readFileSync(join(__dirname, '..', '..', 'uploads', req.file.filename));
        // Create a root reference
        const storageRef: firebase.storage.Reference = firebase.storage().ref();

        const metadata = {
            contentType: req.file.mimetype 
        }
        const uploadTask: firebase.storage.UploadTask = storageRef.child(req.file.originalname).put(file, metadata)

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Uploaded is ' + progress + '% done')
        }, (err) => {
            switch (err.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, async () => {
            const downloadURL: string = await uploadTask.snapshot.ref.getDownloadURL();
            console.log('File availabed on: ', downloadURL)
            const user = await User.findOne({ _id });
            
            if (user) {
                user.img_url = downloadURL;
                user?.save();

                // deleting file of folder uploads after save in firebase
                unlink(join(__dirname, '..', '..', 'uploads', req.file.filename), () => {});
                return res.status(RESPONSE_STATUS.SUCESS).json({
                    user: userView.render(user)
                });
            }
            
            return res.status(RESPONSE_STATUS.NOT_FOUND);
        })
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { _id } = req.params;
            const user = await User.findOneAndDelete({ _id });
    
            if (!user) return res.status(RESPONSE_STATUS.NOT_FOUND);
    
            return res.status(RESPONSE_STATUS.SUCESS).json(user);
        } catch (e) {
            return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({
                message: e
            })
        }
    }
}


export default new UserController();