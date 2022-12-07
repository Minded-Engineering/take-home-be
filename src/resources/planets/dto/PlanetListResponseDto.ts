import { Planet } from '@prisma/client';

export class PlanetListResponseDto {
  public total!: number;
  public results!: PlanetResponseDto[];
}

export class PlanetResponseDto {
  constructor(entity: Planet) {
    this.id = entity.id;
    this.name = entity.name;
    this.diameter = entity.diameter;
    this.gravity = entity.gravity;
    this.terrain = entity.terrain;
  }

  public id: number;
  public name: string;
  public diameter: number;
  public gravity: string;
  public terrain: string;
}
