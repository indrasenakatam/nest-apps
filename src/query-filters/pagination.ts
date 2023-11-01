import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Request } from 'express';

@ObjectType()
export class PaginationFilter {
  @ApiProperty({
    type: Number,
    description: 'page number',
  })
  @IsString()
  @Field(() => Number)
  readonly page: number;

  @ApiProperty({
    type: Number,
    description: 'page limit',
  })
  @IsString()
  @Field(() => Number)
  readonly limit: number;

  @ApiProperty({
    type: Number,
    description: 'page size',
  })
  @IsString()
  @Field(() => Number)
  readonly size: number;

  @ApiProperty({
    type: Number,
    description: 'page number',
  })
  @IsString()
  @Field(() => Number)
  readonly offset: number;
}

export interface Pagination {
  page: number;
  limit: number;
  size: number;
  offset: number;
}

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string);
    const size = parseInt(req.query.size as string);

    // check if page and size are valid
    if (isNaN(page) || page < 0 || isNaN(size) || size < 0) {
      throw new BadRequestException('Invalid pagination params');
    }
    // do not allow to fetch large slices of the dataset
    if (size > 100) {
      throw new BadRequestException(
        'Invalid pagination params: Max size is 100',
      );
    }

    // calculate pagination parameters
    const limit = size;
    const offset = page * limit;
    return { page, limit, size, offset };
  },
);
