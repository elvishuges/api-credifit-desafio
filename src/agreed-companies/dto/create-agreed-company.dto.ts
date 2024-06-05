import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { IsEmailUnique } from '../validators/is-email-unique.validator';

export class CreateAgreedCompanyDTO {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsEmailUnique)
  email: string;

  @ApiProperty()
  @Length(8, 20, { message: 'Senha deve conter no mínimo 8 dígitos!' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
