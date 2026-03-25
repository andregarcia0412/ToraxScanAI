import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClassificationService } from './classification.service';
import { ApiBody, ApiConsumes, ApiCreatedResponse } from '@nestjs/swagger';
import { ReturnClassficationDto } from './dto/return-classification.dto';

@Controller('classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Post('analyze')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['image'],
    },
  })
  @ApiCreatedResponse({ type: ReturnClassficationDto })
  async analyzeImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('image missing');
    }

    return this.classificationService.analyzeImage(file.buffer);
  }
}
