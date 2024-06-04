import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRepresentativeDTO } from './create-representative.dto';

// Ref: https://trilon.io/blog/introducing-mapped-types-for-nestjs
export class UpdateRepresentativeDTO extends PartialType(
  CreateRepresentativeDTO,
) {}