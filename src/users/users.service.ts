import { Injectable, Inject } from '@nestjs/common';
import { Model, SortOrder } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user-create.dto';
import { User } from './users.model';
import { Pagination } from 'src/query-filters/pagination';
import { Sorting, SortingFilter } from 'src/query-filters/sorting';
import { Filtering } from 'src/query-filters/params-filter';
import { getWhere, getOrder } from 'src/query-filters/type-orm';
import { skip } from 'node:test';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(
    pagination?: Pagination,
    sort?: SortingFilter[],
    filter?: Filtering,
  ): Promise<User[]> {
    console.log('pagination', pagination);
    console.log('sort', sort);
    const { page, limit, size, offset } = pagination;
    const order = {};

    sort.map((item) => {
      const obj = JSON.parse(JSON.stringify(eval('(' + item + ')')));
      console.log('fsfgsdfgsdfg', obj, '---', obj.direction, obj.property);
      order[obj.property] = obj.direction as SortOrder;
    });
    console.log('sortOrder', order);
    const query = {
      age: '35',
    };
    return this.userModel.find(query).sort(order).limit(limit).skip(offset).exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async deleteById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
