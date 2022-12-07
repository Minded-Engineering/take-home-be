import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '@/db/prisma/services/prisma.service';
import { PlanetSearchQueryDto } from '@/resources/planets/dto/PlanetSearchQueryDto';
import {
  PlanetListResponseDto,
  PlanetResponseDto,
} from '@/resources/planets/dto/PlanetListResponseDto';
import { SwApiResponseDto } from '@/resources/planets/dto/SwapiResponseDto';
import { Planet } from '@prisma/client';
import axios from 'axios';

@Injectable({ scope: Scope.TRANSIENT })
export class PlanetsService {
  constructor(private prismaService: PrismaService) {}

  private SWAP_BASE = process.env.SWAP_BASE ?? `https://swapi.dev/api`;

  public async getPlanets(
    query: PlanetSearchQueryDto,
  ): Promise<PlanetListResponseDto> {
    const planetsResultPromise = this.prismaService.planet.findMany({
      where: {
        name: {
          contains: query.name,
        },
      },
      take: query.limit,
      skip: query.offset,
    });

    const totalCountPromise = this.prismaService.planet.count({
      where: {
        name: {
          contains: query.name,
        },
      },
    });

    const [results, total] = await Promise.all([
      planetsResultPromise,
      totalCountPromise,
    ]);

    return {
      total,
      results: results.map((planet) => new PlanetResponseDto(planet)),
    };
  }

  public async scrapNewPlanets(query: PlanetSearchQueryDto): Promise<void> {
    const swApiResponse = await axios
      .get(`${this.SWAP_BASE}/planets/?search=${query.name}`)
      .then((response) => response.data as SwApiResponseDto);

    /*
    This is the code that I would like to use here,
    but createMany is not working with SQLLite
    https://github.com/prisma/prisma/issues/11507#issuecomment-1025587202

    const toInsertPlanets = swApiResponse.results.map(
      (planet) =>
        ({
          name: planet.name,
          diameter: planet.diameter,
          gravity: planet.gravity,
          terrain: planet.terrain,
          createdAt: planet.created,
          updatedAt: planet.edited,
        } as unknown as Planet),
    );

    await this.prismaService.planet.createMany({
      data: toInsertPlanets,
    });
     
     */

    await Promise.all(
      swApiResponse.results.map((planet) =>
        this.prismaService.planet.create({
          data: {
            name: planet.name,
            diameter: parseInt(planet.diameter),
            gravity: planet.gravity,
            terrain: planet.terrain,
            createdAt: planet.created,
            updatedAt: planet.edited,
          } as unknown as Planet,
        }),
      ),
    );
  }

  public async getPlanet(id: number): Promise<Planet | null> {
    return this.prismaService.planet.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async deletePlanet(id: number): Promise<Planet | null> {
    return this.prismaService.planet.delete({
      where: {
        id: id,
      },
    });
  }
}
