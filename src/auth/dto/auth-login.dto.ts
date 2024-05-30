import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(10, 100)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar a senha.' })
  password: string;
}
