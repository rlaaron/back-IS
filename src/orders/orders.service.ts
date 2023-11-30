import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';

import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { OrderItemService } from '../order-item/order-item.service';
import { OrderItemController } from '../order-item/order-item.controller';
import { Bread } from 'src/breads/entities/bread.entity';
import { BreadsService } from 'src/breads/breads.service';
import { User } from 'src/auth/entities/user.entity';
// import { async } from 'rxjs';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Bread)
    private readonly breadRepository: Repository<Bread>,
    private readonly orderItemService: OrderItemService,
    private readonly breadService: BreadsService,
    // private readonly orderItemController: OrderItemController,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User) {
    try {
      const { orderItem, ...orderDetails } = createOrderDto;
      const order = this.orderRepository.create({
        ...orderDetails,
        orderItem: orderItem.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        user,
      });
      return await this.orderRepository.save(order);
    } catch (error) {
      console.log(error);
      this.handleDBExeptions(error);
    }
  }

  async findAll() {
    try {
      const orders = await this.orderRepository.find({
        relations: {
          orderItem: true, 
          // orderItem.bread: true,
          // orderItem: {
            
          // }
        }
      });
      // return orders;
      return orders.map(order => ({
        ...order,
        orderItem: order.orderItem.map(item => ({
          ...item
        }))
      }))
    } catch (error) {
      this.handleDBExeptions(error);
    }
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order)
      throw new BadRequestException(`Order with id: ${id}, not found`);

    return order;
  }

  async findOrderByUser(userId: string) {
    const orders = await this.orderRepository.find({
      where: { user: { id: userId } },
    });

    return orders;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    this.orderRepository.remove(order);
  }

  private handleDBExeptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
