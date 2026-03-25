import { ApiProperty } from '@nestjs/swagger';

export class ReturnHealthDto {
  @ApiProperty()
  status: string;
  @ApiProperty()
  uptime: number;
  @ApiProperty()
  cpuPercent: number;
  @ApiProperty()
  virtualMemoryPercent: number;

  constructor(
    status: string,
    uptime: number,
    cpuPercent: number,
    virtualMemoryPercent: number,
  ) {
    this.status = status;
    this.uptime = uptime;
    this.cpuPercent = cpuPercent;
    this.virtualMemoryPercent = virtualMemoryPercent;
  }
}
