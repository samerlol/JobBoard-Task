import { Table, Model, Column, DataType, HasOne, ForeignKey, AllowNull, BelongsTo } from "sequelize-typescript";
import { User } from "./user";
@Table({
    timestamps: true,
    tableName: "companies"
})


export class Company extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    // @HasOne(() => User)
    // @BelongsTo(() => User)
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.STRING)
    userId!: string;
}

