import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AgreedCompany } from '../entities/agreed-company.entity';
import { AgreedCompanyService } from '../services/agreed-company.service';
import { CreateEmployeeDTO } from 'src/employees/dto/create-employee.dto';
import { EmployeeService } from 'src/employees/services/employee.service';
import { CreateAgreedCompanyDTO } from '../dto/create-agreed-company.dto';

@ApiTags('agreedCompanies')
@Controller('agreedCompanies')
export class AgreedCompaniesController {
  constructor(private readonly agreedCompanyService: AgreedCompanyService) {}

  @ApiOperation({ summary: 'Criar Empresa Conveniada' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createAgreedCompanyDTO: CreateAgreedCompanyDTO) {
    return this.agreedCompanyService.create(createAgreedCompanyDTO);
  }

  @ApiOperation({ summary: 'Lista todas as empresas' })
  @Get()
  findAll() {
    return this.agreedCompanyService.findAll();
  }

  @ApiOperation({ summary: 'Lista todas os funcionário da empresa' })
  @Get(':id/employees')
  findAllEmployees(@Param('id') agreedCompanyId: number) {
    return this.agreedCompanyService.findAllEmployees(agreedCompanyId);
  }

  @ApiOperation({ summary: 'Cadastrar funcionário na empresa' })
  @Post(':id/employees')
  async addEmployee(
    @Param('id') agreedCompanyId: number,
    @Body() createEmployeeDTO: CreateEmployeeDTO,
  ) {
    return await this.agreedCompanyService.addEmployee(
      agreedCompanyId,
      createEmployeeDTO,
    );
  }
}
