import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/validation-schema';
import { DatabaseModule } from './config/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ThrottlersModule } from './config/throttlers/throttlers.module';

@Module({
  imports:
    [
      ConfigModule.forRoot({
        envFilePath: '.env',
        validationSchema: envValidationSchema,
        isGlobal: true,
      }),
      DatabaseModule,
      UsersModule,
      ThrottlersModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule { }
