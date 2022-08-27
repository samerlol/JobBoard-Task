import { Table, Model, Column, DataType, ForeignKey, AllowNull, HasAssociation, HasMany, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Applied_Vacancies, Company } from ".";
@Table({
    timestamps: true,
    tableName: "vacancies"
})


export class Vacancy extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    yearsOfExperience!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.ENUM("open", "closed"),
        allowNull: false,
        defaultValue: "open"
    })
    status!: string;

    @ForeignKey(() => Company)
    @AllowNull(false)
    @Column(DataType.STRING)
    companyId!: string;


}