import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { ReturnUserDto } from './dto/return-user.dto';
import { FindUserByIdUseCase } from './use-case/find-user-by-id.use-case';
import { FindUserByEmailUseCase } from './use-case/find-user-by-email.use-case';
import { UpdateUserUseCase } from './use-case/update-user.use-case';
import { DeleteUserUseCase } from './use-case/delete-user.use-case';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(FindUserByIdUseCase)
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(FindUserByEmailUseCase)
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    @Inject(UpdateUserUseCase)
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject(DeleteUserUseCase)
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    return await this.createUserUseCase.execute(createUserDto);
  }

  async findOneById(id: string): Promise<ReturnUserDto> {
    return await this.findUserByIdUseCase.execute(id);
  }

  async findOneByEmail(email: string): Promise<ReturnUserDto> {
    return await this.findUserByEmailUseCase.execute(email);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.updateUserUseCase.execute(id, updateUserDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.deleteUserUseCase.execute(id);
  }
}
