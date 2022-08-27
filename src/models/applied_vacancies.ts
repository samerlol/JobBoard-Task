
import { Table, Model, Column, DataType, ForeignKey, AllowNull, HasAssociation, HasMany, BelongsTo } from "sequelize-typescript";
import { User } from "./user";
import { Vacancy } from "./vacancy";

@Table({
    timestamps: true,
    tableName: "applied_vacancies"
})


export class Applied_Vacancies extends Model {



    // @BelongsTo(() => Vacancy)
    @ForeignKey(() => Vacancy)
    @AllowNull(false)
    @Column(DataType.STRING)
    vacancyId!: Vacancy;

    // @BelongsTo(() => User)
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.STRING)
    userId!: User;

}