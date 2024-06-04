import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateConsignedCreditDTO {
  @ApiProperty()
  @IsNotEmpty()
  totalConsignedCredit: number;

  @ApiProperty()
  @IsNotEmpty()
  numberInstallments: number;

  @ApiProperty()
  @IsNotEmpty()
  agreedCompanyId: number;

  @ApiProperty()
  @IsNotEmpty()
  employeeId: number;
}
