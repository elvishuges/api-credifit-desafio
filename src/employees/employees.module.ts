import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './services/employee.service';
import { IsEmailUnique } from './validators/is-email-unique.validator';
import { AgreedCompaniesModule } from 'src/agreed-companies/agreed-companies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    forwardRef(() => AgreedCompaniesModule),
  ],
  providers: [IsEmailUnique, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeesModule {}
