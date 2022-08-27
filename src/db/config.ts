import { Sequelize } from "sequelize-typescript";
import { User, Company, Vacancy, Applied_Vacancies } from "../models";


const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "@Asd123456",
    database: "JobBoard",
    models: [User, Company, Vacancy, Applied_Vacancies]
});


export default connection;
