import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
    { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (car) return car;
    throw new NotFoundException(`Car with id ${id} not found`);
  }

  create(payload: CreateCarDto) {
    const car: Car = { id: uuid(), ...payload };
    this.cars.push(car);
    return car;
  }

  update(payload: UpdateCarDto, id: string) {
    let cardDB = this.findOne(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        cardDB = {
          ...cardDB,
          ...payload,
        };
        return cardDB;
      }
      return car;
    });
    return cardDB;
  }

  delete(id: string) {
    let car = this.findOne(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
