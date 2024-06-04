import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDTO } from './create-employee.dto';

// Ref: https://trilon.io/blog/introducing-mapped-types-for-nestjs
export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {}
