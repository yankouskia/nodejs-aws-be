import { Client } from 'pg';

export const client = new Client({
  user: process.env.DB_MASTER_USERNAME,
  password: process.env.DB_MASTER_PASSWORD,

  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

client.connect();
