import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Product } from '../../products/entities';
import { Bread } from 'src/breads/entities/bread.entity';
import { Order } from 'src/orders/entities/order.entity';


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => Order,
        ( order ) => order.user
    )
    order: Order;

    //provedor de pan
    @Column('text',{
        nullable: true,
    })
    distribution_zone: string; 

    @Column('numeric',{
        nullable: true,
    })
    phone: number;



    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
