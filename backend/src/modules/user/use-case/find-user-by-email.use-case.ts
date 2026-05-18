import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '../interface/user.repository.port';
import { ReturnUserDto } from '../dto/return-user.dto';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(email: string): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return ReturnUserDto.fromEntity(user);
  }
}
