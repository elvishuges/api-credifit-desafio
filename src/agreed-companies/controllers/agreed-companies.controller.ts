import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAgreedCompanyDTO } from '../dto/create-agreed-company.dto';
import { AgreedCompany } from '../entities/agreed-company.entity';
import { AgreedCompanyService } from '../services/agreed-company.service';
import { Representative } from 'src/representatives/entities/representative.entity';

@ApiTags('agreedCompanies')
@Controller()
export class AgreedCompaniesController {
  constructor(private readonly agreedCompanyService: AgreedCompanyService) {}

  @ApiOperation({ summary: 'Criar Empresa Conveniada' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() representative: CreateAgreedCompanyDTO) {
    return this.agreedCompanyService.create(representative.name);
  }
}
