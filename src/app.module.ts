import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClassificationModule } from './module/classification/classification.module';
import { SystemModule } from './module/system/system.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClassificationModule,
    SystemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
