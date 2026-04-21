import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
    private readonly logger = new Logger(DatabaseService.name);

    constructor(private configService: ConfigService) { }

    createMongooseOptions(): Promise<MongooseModuleOptions> | MongooseModuleOptions {
        return {
            uri: this.configService.get<string>('MONGO_URL'),
            onConnectionCreate: (connection) => {
                connection.on('connected', () =>
                    this.logger.log(' MongoDB connected'),
                );
                connection.on('disconnected', () =>
                    this.logger.warn(' MongoDB disconnected'),
                );
                connection.on('reconnected', () =>
                    this.logger.log(' MongoDB reconnected'),
                );
                connection.on('error', (err) =>
                    this.logger.error(' MongoDB error', err),
                );
                return connection
            }
        }
    }

}
