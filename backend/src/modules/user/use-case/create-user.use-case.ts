import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { HashProviderPort } from 'src/shared/providers/hash/hash.provider.port';
import { CreateUserDto } from '../dto/create-user.dto';
import { ReturnUserDto } from '../dto/return-user.dto';
import { UserRepositoryPort } from '../interface/user.repository.port';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
    @Inject(HashProviderPort)
    private readonly hashProvider: HashProviderPort,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    if (await this.userRepository.findOneByEmail(createUserDto.email)) {
      throw new ConflictException('This email is already in use');
    }

    const hash = await this.hashProvider.generateHash(createUserDto.password);
    createUserDto.password = hash;

    const newUser = await this.userRepository.save(createUserDto);

    return ReturnUserDto.fromEntity(newUser);
  }
}
