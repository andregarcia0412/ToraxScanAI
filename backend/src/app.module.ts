import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClassificationModule } from './modules/classification/classification.module';
import { SystemModule } from './modules/system/system.module';

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
