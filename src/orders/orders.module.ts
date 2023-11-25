import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';


// import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Module({ 
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    // TypeOrmModule.forFeature([Order, OrderItem])
    TypeOrmModule.forFeature([Order])

  ]
})
export class OrdersModule {}
