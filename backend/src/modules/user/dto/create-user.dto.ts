import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric('pt-BR')
  @MaxLength(32)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  @ApiProperty()
  password: string;

  constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
}
