import { PrismaModule } from '@/db/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PlanetsController } from '@/resources/planets/controllers/planets.controller';
import { PlanetsService } from '@/resources/planets/services/planets.service';

@Module({
  imports: [TerminusModule, PrismaModule],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
