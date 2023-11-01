import * as mongoose from 'mongoose';
import { UserAddress } from '../dto/user-create.dto';
import { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  creationDate: Date,
  address: {
    place: String,
    city: String,
    locaton: {
      latitude: Number,
      longitude: Number,
    },
    country: String,
  },
});

UserSchema.virtual('userId').get(function () {
  return this._id;
});

UserSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.userId = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
