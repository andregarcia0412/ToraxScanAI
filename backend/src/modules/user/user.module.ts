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

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepository,
    },
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UserService,
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
