import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RepresentativeDTO } from 'src/representatives/dto/representative.dto';
import { Representative } from 'src/representatives/entities/representative.entity';

export class CreateAgreedCompanyDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  representative: RepresentativeDTO;
}
