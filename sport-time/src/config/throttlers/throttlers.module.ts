import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Throttle, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                throttlers: [
                    {
                        name: 'short',
                        ttl: Number(config.get('THROTTLER_SHORT_TTL')),
                        limit: Number(config.get('THROTTLER_SHORT_LIMIT')),
                    },
                    {
                        name: 'medium',
                        ttl: Number(config.get('THROTTLE_MEDIUM_TTL')),
                        limit: Number(config.get('THROTTLE_MEDIUM_LIMIT')),
                    },
                    {
                        name: 'long',
                        ttl: Number(config.get('THROTTLE_LONG_TTL')),
                        limit: Number(config.get('THROTTLE_LONG_LIMIT')),
                    }
                ]
            }),
        })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class ThrottlersModule { }
