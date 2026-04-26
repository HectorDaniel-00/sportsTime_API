import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enums/user-role.enum';
import { ResponseUserDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)
  private readonly saltOrRounds = 10
  constructor(private readonly repository: UserRepository) { }

  async create(data: CreateUserDto): Promise<ResponseUserDto> {
    const { password, ...user } = data

    const existingUser = await this.repository.findByEmail(data.email)

    if (existingUser) {
      this.logger.error(
        `Error: user with email address ${existingUser.email} already exists.`,
      );
      throw new ConflictException('Hay conflicto con el correo, el correo ya existe.')
    }

    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds)

    const newUser = {
      ...user,
      password: hashedPassword,
      role: UserRole.USER,
    }

    const created = await this.repository.create(newUser)

    if (!created) {
      this.logger.error('El repositorio retornó null al crear usuario')
      throw new InternalServerErrorException('Erro interno del servidor')
    }

    return plainToInstance(ResponseUserDto, created.toObject(), {
      excludeExtraneousValues: true
    })
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.repository.findAll()
    return plainToInstance(ResponseUserDto, users.map((u) => u.toObject()), {
      excludeExtraneousValues: true
    })

  }

  async findOneName(name: string): Promise<ResponseUserDto> {
    if (!name) {
      this.logger.error(`El campo de el nombre esta vacio`)
      throw new NotFoundException('No hay campo proporcionado')
    }

    const user = await this.repository.findByName(name)

    if (!user) {
      this.logger.error(`El usuario con el nombre ${name} no existe`)
      throw new NotFoundException('No existe el usuario')
    }



    return plainToInstance(ResponseUserDto, user.toObject(), {
      excludeExtraneousValues: true
    })
  }

  async findOneEmail(email: string): Promise<ResponseUserDto> {
    if (!email) {
      this.logger.warn('El campo de el correo esta vacio')
      throw new NotFoundException('No hay dato a buscar')
    }

    const user = await this.repository.findByEmail(email)

    if (!user) {
      this.logger.error(`No existe el usuario con el correo electronico: ${email}`)
      throw new NotFoundException('No existe el usuario')
    }

    return plainToInstance(ResponseUserDto, user.toObject(), {
      excludeExtraneousValues: true
    })

  }

  async update(id: string, data: UpdateUserDto): Promise<ResponseUserDto> {
    if (!id) {
      this.logger.error(`El campo de el id esta vacio`)
      throw new NotFoundException('No hay campo proporcionado')
    }

    const user = await this.repository.findById(id)

    if (!user) {
      this.logger.error(`El usuario con el ${id} no existe`)
      throw new NotFoundException(`El usuario ${data.name} no existe`)
    }

    const updateUsers = {
      id: user!.id,
      name: data.name,
      email: data.email,
      password: user!.password,
      role: user!.role,
      isActive: user!.isActive
    }


    const userModify = await this.repository.update(id, updateUsers)
    return plainToInstance(ResponseUserDto, userModify?.toObject(), {
      excludeExtraneousValues: true
    })
  }

  async remove(name: string) {
    const user = await this.repository.findByName(name);

    if (!user) {
      this.logger.warn(`Usuario no encontrado con name: ${name}`);
      throw new NotFoundException('El usuario no existe.');
    }

    await this.repository.removeByName(name);
  }
}
