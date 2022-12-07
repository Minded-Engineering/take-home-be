import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PlanetSearchQueryDto {
  @IsNotEmpty()
  public name!: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  public limit = 5;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public offset = 0;
}
