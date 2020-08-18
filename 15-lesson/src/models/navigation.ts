import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { NavigationAttributes } from '../@types/navigation';

@Table({
    tableName: 'navigations',
})
export class Navigation extends Model<NavigationAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id!: number;

    @Column
    navigation!: string;
}
