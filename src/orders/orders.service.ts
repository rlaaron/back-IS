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

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { orderItem, ...orderDetails } = createOrderDto;
      // const order = this.orderRepository.create({
      //   ...orderDetails,
      //   orderItem: await Promise.all(
      //     orderItem.map((item) =>
      //       // this.orderItemService.create({
      //       //   product_id: item.product_id,
      //       //   quantity: item.quantity,
      //       //   order: order,
      //       // }),
      //       this.orderItemService.create(item)
      //     ),
      //   ),
      // });
      // const savedOrder = await this.orderRepository.save(order);
      let orderItems: OrderItem[];
      const order = this.orderRepository.create({
        ...orderDetails,
        orderItem: orderItems
      });
      orderItems = await Promise.all(
        orderItem.map((item) =>
          this.orderItemService.create({
            product_id: item.product_id,
            quantity: item.quantity,
            order: order,
          }),
        ),
      );

      
      const savedOrder = await this.orderRepository.save(order);
      

      console.log(savedOrder);
  
      return savedOrder;
    } catch (error) {
      this.handleDBExeptions(error);
    }
  }
  // const order = this.orderRepository.create({
      //   ...orderDetails,
      //   orderItem: await Promise.all(
      //     orderItem.map((item) =>
      //       this.orderItemRepository.create({
      //         product_id: item.product_id,
      //         quantity: item.quantity,

      //       }),
      //     ),
      //   ),
      // });
        // const order = this.orderRepository.create({
        //   ...orderDetails,
        //   orderItem: orderItem.map(item =>
        //       this.orderItemRepository.create({
        //         product_id: item.product_id,
        //         quantity: item.quantity,
        //       }),
        //     ),
        // });
  
  findAll() {
    return this.orderRepository.find({});
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order)
      throw new BadRequestException(`Order with id: ${id}, not found`);

    return order;
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
