import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateBreadDto } from './dto/create-bread.dto';
import { UpdateBreadDto } from './dto/update-bread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bread } from './entities/bread.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreadsService {

  private readonly logger = new Logger(BreadsService.name);

  constructor(
    @InjectRepository(Bread)
    private readonly breadRepository: Repository<Bread>,
  ) {}

  async create(createBreadDto: CreateBreadDto) {
    try {
      const bread = this.breadRepository.create(createBreadDto);
      await this.breadRepository.save(bread);
      return bread;
    } catch (error) {
      this.handleDBExeptions(error);
    }
  }

  findAll() {
    return this.breadRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} bread`;
  }

  update(id: number, updateBreadDto: UpdateBreadDto) {
    return `This action updates a #${id} bread`;
  }

  remove(id: number) {
    return `This action removes a #${id} bread`;
  }

  private handleDBExeptions( error: any ){
    if( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error, check server logs');
  }
  
}
