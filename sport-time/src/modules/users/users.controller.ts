import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() data: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(data);
  }

  @Get()
  @Throttle({
    short: { limit: 2, ttl: 1000 },
    medium: { limit: 10, ttl: 10000 },
    long: { limit: 20, ttl: 60000 }
  })
  findAll(): Promise<ResponseUserDto[]> {
    return this.usersService.findAll();
  }

  @Get('search')
  findOne(@Query('name') name: string): Promise<ResponseUserDto> {
    return this.usersService.findOneName(name);
  }

  @Get('search')
  findOneEmail(@Query('email') email: string): Promise<ResponseUserDto> {
    return this.usersService.findOneEmail(email)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<ResponseUserDto> {
    return this.usersService.update(id, data);
  }

  @Delete('search')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Query('name') name: string): Promise<void> {
    return this.usersService.remove(name);
  }
}
