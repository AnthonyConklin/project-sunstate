import { Decimal } from 'decimal.js';
import {
  TemperatureReport,
  TemperatureReportRequest,
} from './temperature-report.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Temperature } from './temperature.entity';
import { InjectRepository } from '@nestjs/typeorm';
const moment = require('moment');

@Injectable()
export class TemperatureService {
  constructor(
    @InjectRepository(Temperature)
    private readonly temperatureRepository: Repository<Temperature>,
  ) {}

  fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * (5 / 9);
  }

  celsiusToFahrenheit(celsius: number): number {
    return celsius * (9 / 5) + 32;
  }

  async saveTemperature(
    fahrenheit: number,
    celsius: number,
  ): Promise<Temperature> {
    const temperature = new Temperature();
    temperature.fahrenheit = fahrenheit;
    temperature.celsius = celsius;
    return await this.temperatureRepository.save(temperature);
  }

  async getTemperatures(
    request: TemperatureReportRequest,
  ): Promise<Temperature[]> {
    return await this.temperatureRepository
      .createQueryBuilder()
      .where('created_at BETWEEN :start AND :end', request)
      .getMany();
  }

  async getAverageInTimeframe(
    request: TemperatureReportRequest,
  ): Promise<TemperatureReport> {
    const averages = await this.temperatureRepository
      .createQueryBuilder()
      .select(
        'AVG(fahrenheit) as fahrenheit, AVG(celsius) as celsius, COUNT(*) as samples',
      )
      .where('created_at BETWEEN :start AND :end', request)
      .getRawOne();

    return {
      fahrenheit: new Decimal(averages.fahrenheit).toFixed(
        request.rounded ? 0 : 4,
      ),
      celsius: new Decimal(averages.celsius).toFixed(request.rounded ? 0 : 4),
      timeframe: {
        start: request.start,
        end: request.end,
        samples: averages.samples,
      },
    };
  }
}
