export class ReturnHealthDto {
  status: string;
  uptime: number;
  cpuPercent: number;
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
