import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { Bread } from 'src/breads/entities/bread.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { BreadsService } from '../breads/breads.service';

@Injectable()
export class OrderItemService {
  private readonly logger = new Logger(OrderItemService.name);

  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly breadService: BreadsService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      const { product_id, quantity } = createOrderItemDto;
      const bread = await this.breadService.findOne(product_id);
      const orderItem = this.orderItemRepository.create({
        product_id,
        bread,
        quantity,
      });
      await this.orderItemRepository.save(orderItem);

      return orderItem;
    } catch (error) {
      this.handleDBExeptions(error);
    }
  }

  findAll() {
    // return `This action returns all orderItem`;
    try{
      const orderItems = this.orderItemRepository.find({
        relations: {
          bread: true,
        }
      })
      return orderItems;
    }catch(error){
      this.handleDBExeptions(error);
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }

  private handleDBExeptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs 55',
    );
  }
}
