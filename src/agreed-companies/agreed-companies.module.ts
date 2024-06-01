import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgreedCompany } from './entities/agreed-company.entity';
import { AgreedCompaniesController } from './controllers/agreed-companies.controller';
import { AgreedCompanyService } from './services/agreed-company.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgreedCompany])],
  controllers: [AgreedCompaniesController],
  providers: [AgreedCompanyService],
  exports: [AgreedCompanyService],
})
export class AgreedCompaniesModule {}
