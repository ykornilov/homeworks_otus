import { Table, Column, Model, DataType, AllowNull} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
})
export default class UserModel extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id: number;

    @AllowNull(false)
    @Column
    username: string;

    @AllowNull(false)
    @Column
    password: string;
}
