import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateRepresentativeDTO } from 'src/representatives/dto/create-representative.dto';
import { Representative } from 'src/representatives/entities/representative.entity';

export class CreateAgreedCompanyDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  representative: CreateRepresentativeDTO;
}
