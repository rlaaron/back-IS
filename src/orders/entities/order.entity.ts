import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    client: string;

    @Column('timestamp')
    request_date: Date;

    @Column('time')
    delivery_date: Date;
}
