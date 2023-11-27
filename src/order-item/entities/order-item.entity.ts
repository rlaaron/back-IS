import { Bread } from 'src/breads/entities/bread.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UUID } from 'crypto';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('text')
  product_id: string;

  @OneToOne(() => Bread, (bread) => bread.orderItem)
  bread: Bread;

  @Column('numeric')
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItem)
  order: Order;
}
