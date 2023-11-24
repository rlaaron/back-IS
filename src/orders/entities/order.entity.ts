import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    client: string;
 
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
