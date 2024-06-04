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
import { Representative } from 'src/representatives/entities/representative.entity';
import { RepresentativeService } from 'src/representatives/services/representative.service';
import { CreateEmployeeDTO } from 'src/employees/dto/create-employee.dto';
import { EmployeeService } from 'src/employees/services/employee.service';
import { CreateAgreedCompanyDTO } from '../dto/create-agreed-company.dto copy';

@ApiTags('agreedCompanies')
@Controller('agreedCompanies')
export class AgreedCompaniesController {
  constructor(
    private readonly agreedCompanyService: AgreedCompanyService,
    private readonly representativeService: RepresentativeService,
    private readonly employeeService: EmployeeService,
  ) {}

  @ApiOperation({ summary: 'Criar Empresa Conveniada' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createAgreedCompanyDTO: CreateAgreedCompanyDTO) {
    const existingRepresentative = await this.representativeService.findByEmail(
      createAgreedCompanyDTO.representative.email,
    );
    if (existingRepresentative) {
      throw new HttpException(
        `Email informado já cadastrado`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdRepresentative = await this.representativeService.create(
      createAgreedCompanyDTO.representative,
    );

    const createdAgreedCompany = this.agreedCompanyService.create(
      createAgreedCompanyDTO.name,
      createdRepresentative,
    );
    return createdAgreedCompany;
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
