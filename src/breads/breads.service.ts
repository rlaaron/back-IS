import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBreadDto } from './dto/create-bread.dto';
import { UpdateBreadDto } from './dto/update-bread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bread } from './entities/bread.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { log } from 'console';


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

  async findOne(term: string) {

    let bread: Bread;
    try{
      if(isUUID(term)){
        console.log('its uuid');
        
        bread = await this.breadRepository.findOneBy({ id: term });
      } else{
        bread = await this.breadRepository.findOneBy({ flavor: term})
      }
    }catch(error){
      this.handleDBExeptions(error);
    }

    if (!bread) {
      throw new NotFoundException(`Bread with ${term} not found.`);
    }
    return bread;
  }

  update(id: number, updateBreadDto: UpdateBreadDto) {
    return `This action updates a #${id} bread`;
  }

  async remove(id: string) {
    const bread = await this.findOne(id);
    await this.breadRepository.remove(bread);
  }

  private handleDBExeptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
