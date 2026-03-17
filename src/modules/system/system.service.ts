import { Injectable } from '@nestjs/common';
import { ReturnHealthDto } from './dto/return-health.dto';
import si from 'systeminformation';
import { ReturnMicroServiceHealthDto } from './dto/return-microservice-health.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SystemService {
  constructor(private readonly configService: ConfigService) {}

  async health(): Promise<ReturnHealthDto> {
    const cpu = await si.currentLoad();
    const cpuPercent = cpu.currentLoad;
    const memory = await si.mem();
    const memoryPercent = (memory.used / memory.total) * 100;

    return new ReturnHealthDto(
      'ok',
      process.uptime(),
      cpuPercent,
      memoryPercent,
    );
  }

  async microserviceHealth(): Promise<ReturnMicroServiceHealthDto> {
    const microserviceUrl =
      this.configService.getOrThrow<string>('MICROSERVICE_URL');

    const { data } = await axios.get<ReturnMicroServiceHealthDto>(
      `${microserviceUrl}/health`,
    );

    return data;
  }
}
