import { Module } from '@nestjs/common';
import { ConsignedCreditService } from './services/consigned-credit.service';
import { ConsignedCreditController } from './controllers/consigned-credit.controller';
import { ConsignedCredit } from './entities/consigned-credit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from 'src/employees/employees.module';
import { Employee } from 'src/employees/entities/employee.entity';
import { AgreedCompany } from 'src/agreed-companies/entities/agreed-company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsignedCredit, Employee, AgreedCompany]),
  ],
  providers: [ConsignedCreditService],
  controllers: [ConsignedCreditController],
})
export class ConsignedCreditsModule {}
