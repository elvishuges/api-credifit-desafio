import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateAgreedCompanyDTO } from 'src/agreed-companies/dto/create-agreed-company.dto';

export class CreateEmployeeDTO {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  salary: number;

  @ApiProperty()
  @IsNotEmpty()
  agreedCompanyId: number;
}
