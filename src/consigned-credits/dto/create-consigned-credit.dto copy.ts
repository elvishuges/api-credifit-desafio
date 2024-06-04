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
  agreedCompanyId: number;

  @ApiProperty()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  statusInfos?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dateNextInstallment?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  currentInstallment?: number;
}
