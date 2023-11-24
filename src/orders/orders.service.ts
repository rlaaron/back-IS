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
    private readonly breadRepository: Repository<Order>,
  ){}

  async create(createOrderDto: CreateOrderDto) {
    try{
      const order = this.breadRepository.create(createOrderDto);
      await this.breadRepository.save(order);
      return order; 
    }catch(error){
      this.handleDBExeptions(error);
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private handleDBExeptions( error: any ){
    if( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
