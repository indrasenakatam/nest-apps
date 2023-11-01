import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsInt, IsString, IsObject, IsNotEmpty, MinDate } from 'class-validator';

@InputType('GeoCoordinatesInput')
@ObjectType({ description: 'geolocation ' })
export class GeoCoordinates {
  @ApiProperty({
    type: String,
    description: 'user latitude',
  })
  @IsString()
  @Field(() => String)
  latitude: number;

  @ApiProperty({
    type: String,
    description: 'user longitude',
  })
  @IsString()
  @Field(() => String)
  longitude: number;
}

@InputType('UserAddressInput')
@ObjectType({ description: 'address ' })
export class UserAddress {
  @ApiProperty({
    type: String,
    description: 'user place',
  })
  @IsString()
  @Field(() => String)
  readonly place: string;

  @ApiProperty({
    type: String,
    description: 'user city',
  })
  @IsString()
  @Field(() => String)
  readonly city: string;

  @ApiProperty({
    type: GeoCoordinates,
    description: 'user geo location',
  })
  @IsObject()
  @Field()
  readonly locaton: GeoCoordinates;

  @ApiProperty({
    type: String,
    description: 'user country',
  })
  @IsString()
  @Field(() => String)
  readonly country: string;
}

@InputType()
export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'user name',
  })
  @IsString()
  @Field(() => String)
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'user age',
  })
  @IsInt()
  @Field(() => Number)
  readonly age: number;

  @ApiProperty({
    type: String,
    description: 'user eamil',
  })
  @IsString()
  @Field(() => String)
  readonly email: string;

  @ApiProperty({
    type: UserAddress,
    description: 'user address',
  })
  @IsObject()
  @Field(() => UserAddress)
  readonly address: UserAddress;

  @Type(() => Date)
  @ApiProperty({
    type: Date,
    description: 'user address',
  })
  @IsNotEmpty()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  @Field()
  readonly creationDate: Date;
}

@ObjectType()
export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'user name',
  })
  @IsString()
  @Field(() => String)
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'user age',
  })
  @IsInt()
  @Field(() => Number)
  readonly age: number;

  @ApiProperty({
    type: String,
    description: 'user eamil',
  })
  @IsString()
  @Field(() => String)
  readonly email: string;

  @ApiProperty({
    type: UserAddress,
    description: 'user address',
  })
  @IsObject()
  @Field()
  readonly address: UserAddress;
}
