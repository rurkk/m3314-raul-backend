import 'dotenv/config';
import { Client } from 'pg';
import { DATABASE_SCHEMA } from './database.constants';
import { buildPostgresConnectionOptions } from './typeorm-connection-options.util';

async function ensureDatabaseSchema(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const options = buildPostgresConnectionOptions(connectionString);

  const client = new Client({
    host: options.host,
    port: options.port,
    user: options.username,
    password: options.password,
    database: options.database,
    ssl: options.ssl,
  });

  await client.connect();

  try {
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${DATABASE_SCHEMA}"`);
  } finally {
    await client.end();
  }
}

ensureDatabaseSchema().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
