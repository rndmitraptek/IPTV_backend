import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'promo' })
export class promo extends Model<promo> { 

    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_promo : number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    urut : number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image_promo_url : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image_promo_name : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title_promo : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    start_date : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    end_date : string;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue:true
    })
    is_active : boolean;
    
}