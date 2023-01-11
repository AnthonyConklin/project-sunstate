import { Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { DecimalToString, DecimalTransformer } from './decimal.transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Temperature {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(DecimalToString(), { toPlainOnly: true })
  fahrenheit: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(DecimalToString(), { toPlainOnly: true })
  celsius: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: boolean;
}
