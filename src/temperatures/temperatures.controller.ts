import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CelsiusConversionRequest,
  FahrenheitConversionRequest,
  TemperatureReport,
  TemperatureReportRequest,
} from './temperature-report.dto';
import { request } from 'http';
const moment = require('moment');

@ApiTags('temperatures')
@Controller('temperatures')
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @Get('')
  @ApiOkResponse({
    description:
      'Listing of temperature records for given start/end date or default to past 7 days.',
    type: TemperatureReport,
  })
  async index(@Query() request: TemperatureReportRequest) {
    const start = request.start
      ? moment(request.start)
      : moment().subtract(7, 'day');
    const end = request.end ? moment(request.end) : moment();
    return this.temperatureService.getTemperatures({
      start: start.toDate(),
      end: end.toDate(),
    });
  }

  @Post('fahrenheit-to-celsius')
  @ApiOkResponse({
    description:
      'Should allow a Fahrenheit temperature to be passed in, it will convert that value to Celsius, it will then save the reading to a database along with the time and conversion value, and return the value as Celsius',
    type: TemperatureReport,
  })
  async fahrenheitToCelsius(
    @Body() request: FahrenheitConversionRequest,
  ): Promise<any> {
    const celsius = this.temperatureService.fahrenheitToCelsius(
      request.fahrenheit,
    );
    await this.temperatureService.saveTemperature(request.fahrenheit, celsius);
    return { celsius };
  }

  @Post('celsius-to-fahrenheit')
  @ApiOkResponse({
    description:
      'Should allow a Celsius temperature reading to be passed in, it will convert that value to Fahrenheit, it will then save the reading to a database along with the time and conversion value, and return the value as Fahrenheit',
    type: TemperatureReport,
  })
  async celsiusToFahrenheit(
    @Body() request: CelsiusConversionRequest,
  ): Promise<any> {
    const fahrenheit = this.temperatureService.celsiusToFahrenheit(
      request.celsius,
    );
    await this.temperatureService.saveTemperature(fahrenheit, request.celsius);
    return { fahrenheit };
  }

  @Get('averages')
  @ApiOkResponse({
    description:
      'Add a third API task that calculates the average temperature over the last week and returns the average values in both Fahrenheit and Celsius',
    type: TemperatureReport,
  })
  async getAverages(@Query() request: TemperatureReportRequest): Promise<any> {
    const start = request.start
      ? moment(request.start)
      : moment().subtract(7, 'day');
    const end = request.end ? moment(request.end) : moment();
    return await this.temperatureService.getAverageInTimeframe({
      start: start.toDate(),
      end: end.toDate(),
      rounded: request.rounded,
    });
  }
}
