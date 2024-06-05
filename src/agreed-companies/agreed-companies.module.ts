import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgreedCompany } from './entities/agreed-company.entity';
import { AgreedCompaniesController } from './controllers/agreed-companies.controller';
import { AgreedCompanyService } from './services/agreed-company.service';
import { EmployeesModule } from 'src/employees/employees.module';
import { Employee } from 'src/employees/entities/employee.entity';
import { IsEmailUnique } from './validators/is-email-unique.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgreedCompany, Employee]),
    forwardRef(() => EmployeesModule),
  ],
  controllers: [AgreedCompaniesController],
  providers: [IsEmailUnique, AgreedCompanyService],
  exports: [AgreedCompanyService],
})
export class AgreedCompaniesModule {}
