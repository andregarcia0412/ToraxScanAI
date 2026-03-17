import { Injectable } from '@nestjs/common';
import FormData from 'form-data';
import { ReturnClassficationDto } from './dto/return-classification.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ClassificationService {
  constructor(private configService: ConfigService) {}

  async analyzeImage(imageBuffer: Buffer): Promise<ReturnClassficationDto> {
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: 'image.jpg',
      contentType: 'image/jpeg',
    });

    const microserviceUrl =
      this.configService.getOrThrow<string>('MICROSERVICE_URL');

    const { data } = await axios.post<ReturnClassficationDto>(
      `${microserviceUrl}/predict`,
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    return data;
  }
}
