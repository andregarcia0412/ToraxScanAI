import { Controller, Get } from '@nestjs/common';
import { ReturnHealthDto } from './dto/return-health.dto';
import { ReturnMicroServiceHealthDto } from './dto/return-microservice-health.dto';
import { SystemService } from './system.service';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('/health')
  @ApiCreatedResponse({ type: ReturnHealthDto })
  async health(): Promise<ReturnHealthDto> {
    return this.systemService.health();
  }

  @Get('/health/microservice')
  @ApiCreatedResponse({ type: ReturnMicroServiceHealthDto })
  async microserviceHealth(): Promise<ReturnMicroServiceHealthDto> {
    return this.systemService.microserviceHealth();
  }
}
