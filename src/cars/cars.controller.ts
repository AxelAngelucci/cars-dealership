import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.findOne(id);
  }

  @Post()
  createCar(@Body() payload) {
    return { ok: true, payload };
  }

  @Patch(':id')
  updateCar(@Body() payload, @Param('id', ParseIntPipe) id: number) {
    return { ok: true, payload, id };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return { message: id };
  }
}
