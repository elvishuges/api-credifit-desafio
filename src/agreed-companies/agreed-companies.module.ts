import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgreedCompany } from './entities/agreed-company.entity';
import { AgreedCompaniesController } from './controllers/agreed-companies.controller';
import { AgreedCompanyService } from './services/agreed-company.service';
import { RepresentativesModule } from 'src/representatives/representatives.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgreedCompany, Employee]),
    EmployeesModule,
    RepresentativesModule,
  ],
  controllers: [AgreedCompaniesController],
  providers: [AgreedCompanyService],
  exports: [AgreedCompanyService],
})
export class AgreedCompaniesModule {}
