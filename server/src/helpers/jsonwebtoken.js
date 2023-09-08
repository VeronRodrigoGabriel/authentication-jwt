import jwt from "jsonwebtoken"

export const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET, (err, token) => {
            if (err) {
                reject("Error al firmar el token");
            }

            resolve({ token });
        })
    })
}