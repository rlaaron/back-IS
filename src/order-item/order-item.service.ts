import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { Bread } from 'src/breads/entities/bread.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
// import { BreadsService } from '../breads/breads.service';
 
@Injectable()
export class OrderItemService {

  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    // @InjectRepository(BreadsService)
    // private readonly breadRepository: Repository<BreadsService>,
    // private readonly breadService: BreadsService,

  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    try{
      const id = createOrderItemDto.product_id;
      // const bread = await this.breadRepository.findOne({id});
      // const bread = await this.breadService.findOne(id);
      const orderItem = this
    }catch(error){
      console.log(error);
      
    }
  }

  findAll() {
    return `This action returns all orderItem`;
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
}
