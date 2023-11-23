import { Module } from '@nestjs/common';
import { BreadsService } from './breads.service';
import { BreadsController } from './breads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bread } from './entities/bread.entity';

@Module({
  controllers: [BreadsController],
  providers: [BreadsService],
  imports: [
    TypeOrmModule.forFeature([Bread])
  ]
})
export class BreadsModule {}
