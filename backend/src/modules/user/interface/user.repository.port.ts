import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepositoryPort {
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  save(createUserDto: CreateUserDto): Promise<User>;
  updateById(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
  deleteById(id: string): Promise<DeleteResult>;
}

export const UserRepositoryPort = Symbol('UserRepositoryPort');
