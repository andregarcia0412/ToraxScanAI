import { Controller, Get } from '@nestjs/common';
import { ReturnHealthDto } from './dto/return-health.dto';
import { ReturnMicroServiceHealthDto } from './dto/return-microservice-health.dto';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('/health')
  async health(): Promise<ReturnHealthDto> {
    return this.systemService.health();
  }

  @Get('/health/microservice')
  async microserviceHealth(): Promise<ReturnMicroServiceHealthDto> {
    return this.systemService.microserviceHealth();
  }
}
