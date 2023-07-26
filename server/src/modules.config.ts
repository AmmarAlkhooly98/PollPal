import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis.module';
import { JwtModule } from '@nestjs/jwt';

export const redisModule = RedisModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const logger = new Logger('RedisModule');

    return {
      connectionOptions: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
      onClientReady: (client) => {
        logger.log('Redis Client Ready');
        logger.log(`${client.options.host}:${client.options.port}`);

        client.on('error', (err) => {
          logger.error('Redis Client Error:', err);
        });

        client.on('connect', () => {
          logger.log(
            `Connected to Redis on port ${client.options.host}:${client.options.port} `,
          );
        });
      },
    };
  },
  inject: [ConfigService],
});
export const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: parseInt(configService.get<string>('POLL_DURATION')),
    },
  }),
  inject: [ConfigService],
});
