import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ReturnUserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;

  constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  static fromEntity(user: User): ReturnUserDto {
    return new ReturnUserDto(user.id, user.email, user.name);
  }
}
