import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';

import { IsEmailUnique } from '../../users/validators/is-email-unique.validator';

export class AuthRegisterDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(10, 100)
  @Validate(IsEmailUnique)
  readonly email: string;

  @ApiProperty()
  @Length(8, 20, { message: 'Senha deve conter no mínimo 8 dígitos!' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
