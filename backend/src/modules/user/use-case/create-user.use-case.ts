import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../interface/user.repository.port';
import { CreateUserDto } from '../dto/create-user.dto';
import { ReturnUserDto } from '../dto/return-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    if (await this.userRepository.findOneByEmail(createUserDto.email)) {
      throw new ConflictException('This email is already in use');
    }

    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;

    const newUser = await this.userRepository.save(createUserDto);

    return ReturnUserDto.fromEntity(newUser);
  }
}
