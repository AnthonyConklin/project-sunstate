import { TemperatureService } from './temperature.service';
import { TemperatureController } from './temperatures.controller';
import { Temperature } from './temperature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Temperature])],
  exports: [TypeOrmModule],
  controllers: [TemperatureController],
  providers: [TemperatureService],
})
export class TemperaturesModule {}
