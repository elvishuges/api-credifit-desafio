import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConsignedCreditService } from '../services/consigned-credit.service';
import { CreateConsignedCreditDTO } from '../dto/create-consigned-credit.dto copy';

@ApiTags('consignedCredits')
@Controller('consignedCredits')
export class ConsignedCreditController {
  constructor(
    private readonly consignedCreditService: ConsignedCreditService,
  ) {}

  @ApiOperation({ summary: 'Simular emprestimo' })
  @Get('simulate/employees/:id')
  simulate(
    @Param('id') employeeId: number,
    @Body() consignedCreditValue: number,
  ) {
    return this.consignedCreditService.simulate(
      employeeId,
      consignedCreditValue,
    );
  }

  @ApiOperation({ summary: 'Criar emprestimo' })
  @Post()
  create(@Body() createConsignedCreditDTO: CreateConsignedCreditDTO) {
    return this.consignedCreditService.create(createConsignedCreditDTO);
  }
}
