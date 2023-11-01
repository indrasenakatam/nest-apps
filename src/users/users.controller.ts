import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  LoggerService,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user-create.dto';
import { User } from './users.model';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  Pagination,
  PaginationFilter,
  PaginationParams,
} from 'src/query-filters/pagination';
import { Sorting, SortingFilter, SortingFilterArray, SortingParams } from 'src/query-filters/sorting';
import { FilteringParams, Filtering } from 'src/query-filters/params-filter';
import { ApiFilterArrayQuery, ApiFilterQuery } from 'src/query-filters/api-filter-query';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Calling createUserDto()', UserController.name);
    return this.userService.create(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: User,
  })

  @ApiFilterQuery('pagination', PaginationFilter)
  @ApiFilterArrayQuery('sort', SortingFilter)
  @Get()
  async findAll(
    @Query('pagination') paginationParams?: Pagination,
    @Query('sort') sort?: SortingFilter[],
    @FilteringParams(['name', 'age', 'email']) filter?: Filtering,
  ): Promise<User[]> {
    this.logger.log('Calling findAll()', UserController.name);
    return this.userService.findAll(paginationParams, sort, filter);
  }

  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: User,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @Get('/:userId')
  async findById(@Param('userId') userId: string): Promise<User> {
    this.logger.log('Calling findById()', UserController.name);
    return this.userService.findById(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: User,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @Put(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.logger.log('Calling update()', UserController.name);
    return this.userService.updateById(userId, updateUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The found user',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    this.logger.log('Calling remove()', UserController.name);
    return this.userService.deleteById(userId);
  }
}
