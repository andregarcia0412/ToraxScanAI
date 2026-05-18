import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepositoryPort } from './interface/user.repository.port';
import { UserRepository } from './repository/user.repository';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { FindUserByIdUseCase } from './use-case/find-user-by-id.use-case';
import { FindUserByEmailUseCase } from './use-case/find-user-by-email.use-case';
import { UpdateUserUseCase } from './use-case/update-user.use-case';
import { DeleteUserUseCase } from './use-case/delete-user.use-case';
import { HashProviderPort } from 'src/shared/providers/hash/hash.provider.port';
import { BcryptProvider } from 'src/shared/providers/hash/bcrypt.provider';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepository,
    },
    {
      provide: HashProviderPort,
      useClass: BcryptProvider,
    },
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UserService,
  ],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, UserRepositoryPort],
})
export class UserModule {}
