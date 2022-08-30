require("dotenv").config();
import express, { Request, Response, NextFunction } from 'express';
import connection from './db/config';
import { json, urlencoded } from "body-parser";
import { companyRoutes, userRoutes, vacancyRoutes } from "./routes";
import { createUser } from "./controllers/user";

import { validateApiKey, createUser as validateCreateUser } from "./middleware";


const { PORT } = process.env;

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.post('/user/', [validateCreateUser], createUser);

app.use(validateApiKey)

app.use("/vacancy", vacancyRoutes);
app.use("/company", companyRoutes);
app.use("/user", userRoutes);

connection.sync({ force: false }).then(() => {
    console.log(`Database synced.`);
}).catch((err) => { console.log(`Error: `, err) });

app.use((
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(500).json({ message: err.message })
});
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
