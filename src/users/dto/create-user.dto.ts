import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';

import { IsEmailUnique } from '../validators/is-email-unique.validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

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
