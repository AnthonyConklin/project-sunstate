import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Moment } from 'moment';

export class FahrenheitConversionRequest {
  @ApiProperty()
  fahrenheit: number;
}

export class CelsiusConversionRequest {
  @ApiProperty()
  celsius: number;
}

export class TemperatureReportRequest {
  @ApiPropertyOptional()
  start?: Date;
  @ApiPropertyOptional()
  end?: Date;
  @ApiPropertyOptional({
    default: false,
  })
  rounded?: boolean = false;
}

export class Timeframe {
  @ApiProperty()
  start: Date;
  @ApiProperty()
  end: Date;
  @ApiProperty()
  samples?: number;
}
export class TemperatureReport {
  @ApiProperty()
  timeframe: Timeframe;
  @ApiProperty()
  fahrenheit: string;
  @ApiProperty()
  celsius: string;
}
