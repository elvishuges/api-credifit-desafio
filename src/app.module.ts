import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/services/auth.service';
import { AuthModule } from './auth/auth.module';
import { RepresentativesModule } from './representatives/representatives.module';
import { EmployeesModule } from './employees/employees.module';
import { AgreedCompaniesModule } from './agreed-companies/agreed-companies.module';
import { ConsignedCreditsModule } from './consigned-credits/consigned-credits.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'desafioDB_1',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),
    EmployeesModule,
    UsersModule,
    AuthModule,
    RepresentativesModule,
    AgreedCompaniesModule,
    ConsignedCreditsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
