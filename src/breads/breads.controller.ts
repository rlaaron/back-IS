import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreadsService } from './breads.service';
import { CreateBreadDto } from './dto/create-bread.dto';
import { UpdateBreadDto } from './dto/update-bread.dto';

@Controller('breads')
export class BreadsController {
  constructor(private readonly breadsService: BreadsService) {}

  @Post()
  create(@Body() createBreadDto: CreateBreadDto) {
    return this.breadsService.create(createBreadDto);
  }

  @Get()
  findAll() {
    return this.breadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreadDto: UpdateBreadDto) {
    return this.breadsService.update(+id, updateBreadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breadsService.remove(+id);
  }
}
