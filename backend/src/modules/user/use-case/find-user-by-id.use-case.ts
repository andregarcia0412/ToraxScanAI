import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '../interface/user.repository.port';
import { ReturnUserDto } from '../dto/return-user.dto';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: string): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return ReturnUserDto.fromEntity(user);
  }
}
