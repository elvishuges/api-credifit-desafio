import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateConsignedCreditDTO {
  @ApiProperty()
  @IsNotEmpty()
  totalConsignedCredit: number;

  @ApiProperty()
  @IsNotEmpty()
  numberInstallments: number;

  @ApiProperty()
  @IsNotEmpty()
  employeeId: number;
}
