import { Table, Column, Model, DataType, Length, AllowNull, BeforeCreate } from 'sequelize-typescript';
import { Navigation } from '../graphql';

@Table({
    tableName: 'navigations',
    createdAt: false,
    updatedAt: false,
})
export default class NavigationModel extends Model<Navigation> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id: number;

    @AllowNull(false)
    @Length({min: 2, max: 20})
    @Column
    name: string;

    @AllowNull(false)
    @Column
    url: string;

    @Column
    icon: string;

    @BeforeCreate
    static log(instance: NavigationModel): void {
        console.log('new navigation: ', instance.get());
    };
}
