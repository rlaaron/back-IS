import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ){}

  async create(createOrderDto: CreateOrderDto) {
    try{
      const order = this.orderRepository.create(createOrderDto);
      await this.orderRepository.save(order);
      return order; 
    }catch(error){
      this.handleDBExeptions(error);
    }
  }

  findAll() {
    return this.orderRepository.find({});
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneBy({id});
    if(!order)
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

  private handleDBExeptions( error: any ){
    if( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
