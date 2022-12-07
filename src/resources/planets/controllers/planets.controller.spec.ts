import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';

import { PlanetsController } from '@/resources/planets/controllers/planets.controller';
import { PlanetsService } from '@/resources/planets/services/planets.service';

import {
  PlanetListResponseDto,
  PlanetResponseDto,
} from '@/resources/planets/dto/PlanetListResponseDto';
import { NotFoundException } from '@nestjs/common';

describe('Planet Controller', () => {
  let controller: PlanetsController;
  let planetsService: PlanetsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PlanetsController],
    })
      .useMocker(() => createMock())
      .compile();

    controller = moduleRef.get(PlanetsController);
    planetsService = moduleRef.get(PlanetsService);
  });

  describe('Test search function', () => {
    it('Should return a list of planets from DB', async () => {
      const planetsMock: PlanetListResponseDto = {
        total: 1,
        results: [
          {
            id: 1,
            name: 'Tatooine',
            diameter: 10465,
            gravity: '1 standard',
            terrain: 'desert',
          },
        ],
      };

      jest
        .spyOn(planetsService, 'getPlanets')
        .mockResolvedValueOnce(new Promise((resolve) => resolve(planetsMock)));

      const response = await controller.search({
        name: 'Tatooine',
        limit: 1,
        offset: 0,
      });

      expect(response).toBe(planetsMock);
    });
  });

  describe('Test getPlanet function', () => {
    it('Should return a planet', async () => {
      const fundPlanetMock = {
        id: 2,
        name: 'Nal Hutta',
        diameter: 12150,
        gravity: '1 standard',
        terrain: 'urban, oceans, swamps, bogs',
        createdAt: new Date('2014-12-10T17:11:29.452Z'),
        updatedAt: new Date('2014-12-20T20:58:18.460Z'),
        deletedAt: null,
      };

      jest
        .spyOn(planetsService, 'getPlanet')
        .mockResolvedValueOnce(
          new Promise((resolve) => resolve(fundPlanetMock)),
        );

      const okMock = new PlanetResponseDto(fundPlanetMock);

      const response = await controller.getPlanet({ id: 1 }, { id: 1 });

      expect(response).toStrictEqual(okMock);
    });

    it('Should return a 404 error', async () => {
      jest
        .spyOn(planetsService, 'getPlanet')
        .mockResolvedValueOnce(new Promise((resolve) => resolve(null)));
      try {
        await controller.getPlanet({ id: 1 }, { id: 1 });
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Not Found');
      }
    });
  });

  describe('Test deletePlanet function', () => {
    it('Should delete a planet', async () => {
      const fundPlanetMock = {
        id: 2,
        name: 'Nal Hutta',
        diameter: 12150,
        gravity: '1 standard',
        terrain: 'urban, oceans, swamps, bogs',
        createdAt: new Date('2014-12-10T17:11:29.452Z'),
        updatedAt: new Date('2014-12-20T20:58:18.460Z'),
        deletedAt: null,
      };

      jest
        .spyOn(planetsService, 'getPlanet')
        .mockResolvedValueOnce(
          new Promise((resolve) => resolve(fundPlanetMock)),
        );

      jest
        .spyOn(planetsService, 'getPlanet')
        .mockResolvedValueOnce(
          new Promise((resolve) => resolve(fundPlanetMock)),
        );

      const response = await controller.deletePlanet({ id: 1 }, { id: 1 });

      expect(response).toStrictEqual(undefined);
    });

    it('Should return a 404 error', async () => {
      jest
        .spyOn(planetsService, 'getPlanet')
        .mockResolvedValueOnce(new Promise((resolve) => resolve(null)));
      try {
        await controller.deletePlanet({ id: 1 }, { id: 1 });
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Not Found');
      }
    });
  });
});
