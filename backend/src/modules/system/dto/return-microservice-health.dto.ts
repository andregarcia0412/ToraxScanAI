import { ApiProperty } from '@nestjs/swagger';

export class ReturnMicroServiceHealthDto {
  @ApiProperty()
  status: string;
  @ApiProperty()
  uptime: number;
  @ApiProperty()
  cpu_percent: number;
  @ApiProperty()
  virtual_memory_percent: number;
}
