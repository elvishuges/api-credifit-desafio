import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAgreedCompanyDTO } from './create-agreed-company.dto copy';

// Ref: https://trilon.io/blog/introducing-mapped-types-for-nestjs
export class UpdateAgreedCompanyDTO extends PartialType(
  CreateAgreedCompanyDTO,
) {}
