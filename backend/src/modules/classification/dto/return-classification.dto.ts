import { ApiProperty } from '@nestjs/swagger';

export class ReturnClassficationDto {
  @ApiProperty()
  className: string;
  @ApiProperty()
  confidence: number;

  constructor(className: string, confidence: number) {
    this.className = className;
    this.confidence = confidence;
  }
}
