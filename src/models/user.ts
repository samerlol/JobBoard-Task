import { Table, Model, Column, DataType, BelongsTo, ForeignKey, HasOne, HasMany, HasAssociation, AllowNull } from "sequelize-typescript";

import { Company } from "./company";
// import { UUIDV4 } from "sequelize/types";
// const { uuid } = require('uuidv4');
// type Company = {
//     name: string,
//     description: string,
//     email: string
// }
@Table({
    timestamps: true,
    tableName: "users",

})


export class User extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstName!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            min: 8,
            max: 16,

        }
    })
    password!: string;
    @Column({
        type: DataType.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataType.UUIDV4,
    })
    apiKey!: string;

}