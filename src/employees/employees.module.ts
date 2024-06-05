import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './services/employee.service';
import { IsEmailUnique } from './validators/is-email-unique.validator';
import { RepresentativesModule } from 'src/representatives/representatives.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), RepresentativesModule],
  providers: [IsEmailUnique, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeesModule {}
