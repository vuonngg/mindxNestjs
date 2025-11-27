import { Controller, Get, Post, Put, Delete, Param, Body, Inject } from '@nestjs/common';
import { UserServiceTokens } from '../../Application/dtos/user.dto';
import type { IUsersService, CreateUserDTO, UpdateUserDTO } from '../../Application/dtos/user.dto';

/**
 * HTTP Adapter - Infrastructure Layer
 * Chịu trách nhiệm nhận HTTP requests và gọi Application Service
 */
@Controller('/api/users')
export class UsersController {
  constructor(
    @Inject(UserServiceTokens.Service)
    private readonly usersService: IUsersService,
  ) {}

  @Get()
  async getAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Post()
  async create(@Body() user: CreateUserDTO) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedFields: UpdateUserDTO) {
    return this.usersService.updateUser(+id, updatedFields);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}

