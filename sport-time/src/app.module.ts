import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/validation-schema';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: 
  [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: envValidationSchema,
      isGlobal: true
    }), 
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
