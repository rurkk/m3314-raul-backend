import { parse } from 'pg-connection-string';
import { TlsOptions } from 'node:tls';

export type PostgresConnectionOptions = {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean | TlsOptions;
};

export function buildPostgresConnectionOptions(
  connectionString: string,
): PostgresConnectionOptions {
  const parsedConnection = parse(connectionString);

  const host = parsedConnection.host;
  const username = parsedConnection.user;
  const database = parsedConnection.database;
  const port = parsePort(parsedConnection.port);

  if (!host || !username || !database) {
    throw new Error(
      'DATABASE_URL must contain host, username and database name',
    );
  }

  const ssl = parseSsl(parsedConnection.ssl);

  return {
    type: 'postgres',
    host,
    port,
    username,
    password: parsedConnection.password ?? '',
    database,
    ...(ssl !== undefined ? { ssl } : {}),
  };
}

function parsePort(port: string | null | undefined): number {
  if (!port) {
    return 5432;
  }

  const parsedPort = Number(port);

  if (!Number.isInteger(parsedPort) || parsedPort <= 0) {
    throw new Error('DATABASE_URL contains invalid port');
  }

  return parsedPort;
}

function parseSsl(ssl: unknown): boolean | TlsOptions | undefined {
  if (ssl === undefined || ssl === null) {
    return undefined;
  }

  if (typeof ssl === 'boolean') {
    return ssl;
  }

  if (typeof ssl === 'object') {
    return ssl as TlsOptions;
  }

  if (typeof ssl === 'string') {
    if (ssl === 'true' || ssl === '1') {
      return true;
    }

    if (ssl === 'false' || ssl === '0') {
      return false;
    }
  }

  return undefined;
}
