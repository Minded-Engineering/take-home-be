export interface SwApiPlanetDto {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface SwApiResponseDto {
  count: number;
  next: string;
  previous?: any;
  results: SwApiPlanetDto[];
}
