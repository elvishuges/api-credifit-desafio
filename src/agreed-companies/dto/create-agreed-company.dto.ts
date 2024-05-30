import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAgreedCompanyDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
