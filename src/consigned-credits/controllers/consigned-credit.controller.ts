import { Body, Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConsignedCreditService } from '../services/consigned-credit.service';

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
}
