import { Bread } from 'src/breads/entities/bread.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UUID } from 'crypto';
import { Order } from 'src/orders/entities/order.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('text')
  product_id: string;

  @OneToMany(() => Bread, (bread) => bread.orderItem)
  @JoinColumn()
  bread: Bread;

  @Column('numeric')
  quantity: number;

  @IsOptional()
  @ManyToOne(() => Order, (order) => order.orderItem)
  @JoinColumn()
  order?: Order;
}
