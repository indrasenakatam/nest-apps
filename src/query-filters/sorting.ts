import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { Request } from 'express';

@ObjectType()
@InputType()
export class SortingFilter {
  @ApiProperty({ description: 'user name', example: 'indrasena' })
  @IsString()
  @Field(() => String)
  readonly property?: string;

  @ApiProperty({ description: 'sorting order', example: 'asc' })
  @IsString()
  @Field(() => String)
  readonly direction?: string;
}

export class SortingFilterArray {
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [SortingFilter] })
  readonly sorting?: SortingFilter[];
}
export interface Sorting {
  property: string;
  direction: string;
}

export const SortingParams = createParamDecorator(
  (validParams, ctx: ExecutionContext): Sorting => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) return null;

    // check if the valid params sent is an array
    if (typeof validParams != 'object')
      throw new BadRequestException('Invalid sort parameter');

    // check the format of the sort query param
    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
    if (!sort.match(sortPattern))
      throw new BadRequestException('Invalid sort parameter');

    // extract the property name and direction and check if they are valid
    const [property, direction] = sort.split(':');
    if (!validParams.includes(property))
      throw new BadRequestException(`Invalid sort property: ${property}`);

    return { property, direction };
  },
);
