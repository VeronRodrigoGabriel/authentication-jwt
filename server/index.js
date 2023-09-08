import express from "express";
import morgan from "morgan"
import cors from "cors";
import helmet, { contentSecurityPolicy } from "helmet";
import dotenv from "dotenv";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;


//middleware
app.use(morgan('dev'));
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(cors());
app.use(express.json());

//database
import { sequelize } from "./src/config/db.js";
sequelize.authenticate()
    .then(() => {
        console.log("database connected");
    })
    .catch(err => {
        console.log(err);
    });

//rutas
import authRouter from "./src/routes/auth.routes.js"

app.use('/auth', authRouter)


app.listen(PORT, () => {
    console.log('listening on port', PORT);
})