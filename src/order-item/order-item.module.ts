import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Bread } from 'src/breads/entities/bread.entity';
import { BreadsService } from 'src/breads/breads.service';
 

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, BreadsService],
  imports: [
    // TypeOrmModule.forFeature([OrderItem, Bread])
    TypeOrmModule.forFeature([OrderItem, Bread])

  ]
})
export class OrderItemModule {}
