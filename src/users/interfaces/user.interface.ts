import { Document } from 'mongoose';
import { UserAddress } from '../dto/user-create.dto';

export interface User extends Document {
  readonly userId: string;
  readonly name: string;
  readonly age: number;
  readonly email: string;
  readonly address: UserAddress;
  readonly creationDate: Date;
}
