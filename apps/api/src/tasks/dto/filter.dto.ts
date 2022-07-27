import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterTaskDto implements Pick<Prisma.TaskWhereInput, 'completed'> {
  @Transform(({ value }) => (value === 'true' || value === '1' ? true : false))
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
