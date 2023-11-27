import { Bread } from 'src/breads/entities/bread.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        // unique: true,
    })
    client: string;

    @OneToMany(
        () => OrderItem,
        (orderItem) => orderItem.order,
        { cascade: true}
    )
    @JoinColumn()
    orderItem: OrderItem[];
 
    @Column('date')
    request_date: Date;
    //TODO: REVISAR QUE TIPO DE DATO Y COMO HARE ESTA PETICION

    @Column('date')
    delivery_date: Date;

    @BeforeInsert()
    checkDates() {
        this.request_date = new Date();
        this.delivery_date = new Date();
    }
}
