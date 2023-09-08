import jwt from 'jsonwebtoken';
import { generateToken } from '../helpers/jsonwebtoken.js';
import { createUser, getUserByEmailAndPassword, getUserById } from '../models/User.model.js';


export const ctrlRegister = async (req, res) => {
    try {
        const user = await createUser(req.body);

        const token = await generateToken({ user: user.id })

        res.status(200).json(token);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
};

export const ctrlLogin = async (req, res) => {
    try {
        const user = await getUserByEmailAndPassword(req.body)

        const token = await generateToken({ user: user.id })

        res.status(200).json(token)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
};

//validacion de token
export const ctrlValidacion = async (req, res) => {
    const token = req.headers.authorization

    if (!token) {
        return res.sendStatus(403)
    }

    const { user: userId } = jwt.verify(token, process.env.SECRET)

    const user = await getUserById(userId)

    if (!user) {
        return res.sendStatus(403)
    }

    res.status(200).json(user)
}