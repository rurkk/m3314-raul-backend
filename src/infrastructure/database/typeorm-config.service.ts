import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { DATABASE_SCHEMA } from './database.constants';
import { buildPostgresConnectionOptions } from './typeorm-connection-options.util';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const connectionString = this.configService.get<string>('DATABASE_URL');

    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }

    const options: TypeOrmModuleOptions = {
      ...buildPostgresConnectionOptions(connectionString),
      schema: DATABASE_SCHEMA,
      autoLoadEntities: true,
      synchronize: false,
    };

    return options;
  }
}
