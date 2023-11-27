import { OrderItem } from "src/order-item/entities/order-item.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bread {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    flavor: string; 

    @Column('numeric')
    price: number;
    

    @OneToOne(
        () => OrderItem,
        (orderItem) => orderItem.bread,
    )
    orderItem: OrderItem;
}
