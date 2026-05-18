import {
  Body,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashProviderPort } from 'src/shared/providers/hash/hash.provider.port';
import { UserRepositoryPort } from '../user/interface/user.repository.port';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(HashProviderPort)
    private readonly hashProvider: HashProviderPort,
  ) {}

  private async getTokens(
    userId: string,
    email: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_REFRESH_EXPIRATION_TIME',
          ) as any,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_EXPIRATION_TIME',
          ) as any,
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOneByEmail(loginDto.email);
    if (
      !user ||
      !(await this.hashProvider.compare(loginDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const tokens = await this.getTokens(user.id, user.email);

    return new AuthResponseDto(tokens.accessToken, tokens.refreshToken);
  }

  async refresh(refreshDto: RefreshDto): Promise<AuthResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        },
      );
      const user = await this.userRepository.findOneById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }

      const tokens = await this.getTokens(user.id, user.email);

      return new AuthResponseDto(tokens.accessToken, tokens.refreshToken);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async register(registerDto: CreateUserDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(registerDto);

    const tokens = await this.getTokens(user.id, user.email);

    return new AuthResponseDto(tokens.accessToken, tokens.refreshToken);
  }
}
