import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateConsignedCreditDTO } from './create-consigned-credit.dto';

// Ref: https://trilon.io/blog/introducing-mapped-types-for-nestjs
export class UpdateConsignedCreditDTO extends PartialType(
  CreateConsignedCreditDTO,
) {}
