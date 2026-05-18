import { Module } from '@nestjs/common';
import { BcryptProvider } from 'src/shared/providers/hash/bcrypt.provider';
import { HashProviderPort } from 'src/shared/providers/hash/hash.provider.port';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashProviderPort,
      useClass: BcryptProvider,
    },
    AuthService,
  ],
})
export class AuthModule {}
