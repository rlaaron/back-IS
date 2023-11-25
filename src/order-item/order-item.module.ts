import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Bread } from 'src/breads/entities/bread.entity';


@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  imports: [
    // TypeOrmModule.forFeature([OrderItem, Bread])
    TypeOrmModule.forFeature([OrderItem])

  ]
})
export class OrderItemModule {}
