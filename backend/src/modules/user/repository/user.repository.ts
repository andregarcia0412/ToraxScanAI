import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../interface/user.repository.port';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOneById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }
  async save(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(createdUser);
  }
  async updateById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }
  async deleteById(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}