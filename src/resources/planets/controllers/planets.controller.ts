import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlanetsService } from '@/resources/planets/services/planets.service';
import { PlanetSearchQueryDto } from '@/resources/planets/dto/PlanetSearchQueryDto';
import { PlanetResponseDto } from '@/resources/planets/dto/PlanetListResponseDto';
import { PlanetIdParamDto } from '@/resources/planets/dto/PlanetIdParamDto';
import { AuthInterceptor } from '@/core/interceptors/auth.interceptor';
import { AuthUser } from '@/core/decorators/user.decorator';

@ApiTags('Planets')
@Controller('planets-api')
export class PlanetsController {
  private logger: Logger;
  constructor(private PlanetsService: PlanetsService) {
    this.logger = new Logger(PlanetsController.name);
  }

  @Get('search')
  async search(@Query() query: PlanetSearchQueryDto) {
    const existingPlanets = await this.PlanetsService.getPlanets(query);
    if (existingPlanets.total > 0) {
      return existingPlanets;
    } else {
      await this.PlanetsService.scrapNewPlanets(query);
      return await this.PlanetsService.getPlanets(query);
    }
  }

  @Get('planet/:id')
  @UseInterceptors(AuthInterceptor)
  async getPlanet(@Param() params: PlanetIdParamDto, @AuthUser() user: any) {
    this.logger.log(`User ${user.id} is requesting planet ${params.id}`);

    const planet = await this.PlanetsService.getPlanet(params.id);

    if (!planet) {
      throw new NotFoundException();
    }

    return new PlanetResponseDto(planet);
  }

  @Delete('planet/:id')
  @HttpCode(204)
  @UseInterceptors(AuthInterceptor)
  async deletePlanet(@Param() params: PlanetIdParamDto, @AuthUser() user: any) {
    this.logger.log(`User ${user.id} is deleting planet ${params.id}`);
    const planet = await this.PlanetsService.getPlanet(params.id);
    if (!planet) {
      throw new NotFoundException();
    }
    await this.PlanetsService.deletePlanet(params.id);
  }
}
