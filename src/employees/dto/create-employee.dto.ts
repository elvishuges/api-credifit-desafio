import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { IsEmailUnique } from '../validators/is-email-unique.validator';

export class CreateEmployeeDTO {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(10, 100)
  @Validate(IsEmailUnique)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  score: number;

  @ApiProperty()
  @Length(8, 20, { message: 'Senha deve conter no mínimo 8 dígitos!' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  salary: number;

  @ApiProperty()
  @IsNotEmpty()
  agreedCompanyId: number;
}
