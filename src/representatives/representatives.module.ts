import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Representative } from './entities/representative.entity';
import { RepresentativeService } from './services/representative.service';

@Module({
  imports: [TypeOrmModule.forFeature([Representative])],
  providers: [RepresentativeService],
  exports: [RepresentativeService],
})
export class RepresentativesModule {}
