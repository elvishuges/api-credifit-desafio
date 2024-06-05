import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ConsignedCreditDTO {
  @ApiProperty()
  @IsNotEmpty()
  consignedCreditValue: number;
}
