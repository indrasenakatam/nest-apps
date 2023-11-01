import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { usersProviders } from './users.providers';
import { UserResolver } from './users.resolver';
import { DateScalar } from '../common/scalars/date.scalar';
import { ObjectIdScalar } from 'src/common/scalars/mongo.objectId.scalar';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserResolver, UserService, ...usersProviders, DateScalar, ObjectIdScalar],
})
export class UserModule {}
