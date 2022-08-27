// import { Table, Model, Column, DataType, HasOne, ForeignKey, AllowNull, BelongsTo, HasMany } from "sequelize-typescript";
// @Table({
//     timestamps: true,
//     tableName: "companies"
// })


// export class Company extends Model {

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     name!: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     description!: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     email!: string;

//     // @HasOne(() => User)
//     @BelongsTo(() => User)
//     @AllowNull(false)
//     @Column(DataType.STRING)
//     userId!: string;
// }



// @Table({
//     timestamps: true,
//     tableName: "users",

// })


// export class User extends Model {

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     firstName!: string;
//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     lastName!: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isEmail: true
//         }
//     })
//     email!: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//         validate: {
//             min: 8,
//             max: 16,

//         }
//     })
//     password!: string;
//     @Column({
//         type: DataType.UUID,
//         allowNull: false,
//         unique: true,
//         defaultValue: DataType.UUIDV4,
//     })
//     apiKey!: string;


// }



// @Table({
//     timestamps: true,
//     tableName: "vacancies"
// })


// export class Vacancy extends Model {

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     positionTitle!: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     yearsOfExperience!: number;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     description!: string;

//     @Column({
//         type: DataType.ENUM("open", "closed"),
//         allowNull: false,

//     })
//     status!: string;

//     @BelongsTo(() => Company)
//     @AllowNull(false)
//     @Column(DataType.STRING)
//     companyId!: string;

// }
