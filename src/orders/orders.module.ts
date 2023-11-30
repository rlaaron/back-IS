import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';


import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { OrderItemService } from 'src/order-item/order-item.service';
import { OrderItemController } from 'src/order-item/order-item.controller';
import { BreadsService } from 'src/breads/breads.service';
import { Bread } from 'src/breads/entities/bread.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({ 
  controllers: [OrdersController],
  providers: [OrdersService, OrderItemService, BreadsService], 
  // providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Bread]),
    AuthModule,
  ],
  exports: [
    OrdersService,
    TypeOrmModule,
  ]
})
export class OrdersModule {}
