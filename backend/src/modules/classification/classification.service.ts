import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import FormData from 'form-data';
import { ReturnClassficationDto } from './dto/return-classification.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AnalyzeResponseDto } from './dto/analyze-response.dto';

@Injectable()
export class ClassificationService {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(ClassificationService.name);

  async analyzeImage(imageBuffer: Buffer): Promise<ReturnClassficationDto> {
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: 'image.jpg',
      contentType: 'image/jpeg',
    });

    const microserviceUrl =
      this.configService.getOrThrow<string>('MICROSERVICE_URL');

    try {
      const { data } = await axios.post<AnalyzeResponseDto>(
        `${microserviceUrl}/predict`,
        formData,
        {
          headers: formData.getHeaders(),
        },
      );
      return new ReturnClassficationDto(data.class_name, data.confidence);
    } catch (e) {
      this.logger.error(
        `Error predicting image: message=${e?.message} code=${e?.code} address=${e?.address} port=${e?.port}`,
      );
      throw new BadRequestException(e?.message ?? 'Unknown Error');
    }
  }
}
