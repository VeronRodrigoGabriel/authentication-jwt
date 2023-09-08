import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const ROLES = {
    ADMIN: "admin",
    USER: "user"
}
const UserModel = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles: {
        type: DataTypes.ENUM(ROLES.ADMIN, ROLES.USER),
        defaultValue: ROLES.USER
    }
}, {
    timestamps: true
})

UserModel.sync({ force: false }).then(() => {
    console.log('Table user created')
})

//createUser
export async function createUser(user) {
    return await UserModel.create(user)
}

//getAll
export async function getallUsers() {
    return await UserModel.findAll();
}

//getUserById
export async function getUserById(userId) {
    const user = await UserModel.findByPk(userId);

    return user
}

//deletedUser
export async function deletedUser(userId) {
    return await UserModel.destroy(userId);
}
//getUser
export async function getUserByEmailAndPassword({ email, password }) {

    const user = await UserModel.findOne({
        where: { email }
    });

    if (!user) {
        return null
    }

    if (password !== user.password) {
        return null
    }

    return user
}

