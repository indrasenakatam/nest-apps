import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { UserAddress } from './dto/user-create.dto';
import { ObjectId } from 'mongoose';
import { ObjectIdScalar } from 'src/common/scalars/mongo.objectId.scalar';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'user ' })
export class User {
  @ApiProperty({
    type: String,
    description: 'user id',
  })
  @Field(() => ObjectIdScalar)
  readonly userId: ObjectId;

  @ApiProperty({
    type: String,
    description: 'user name',
  })
  @Field(() => String)
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'user age',
  })
  @ApiProperty({ example: 20, description: 'The age of the user' })
  @Field(() => Number)
  readonly age: number;

  @ApiProperty({
    type: String,
    description: 'user email',
  })
  @Field(() => String)
  readonly email: string;

  @ApiProperty({
    type: UserAddress,
    description: 'user address',
  })
  @Field()
  readonly address: UserAddress;

  @ApiProperty({
    type: Date,
    description: 'user creation date',
  })
  @Field()
  creationDate: Date;
}
