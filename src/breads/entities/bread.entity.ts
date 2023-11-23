import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bread {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    flavor: string;


}
