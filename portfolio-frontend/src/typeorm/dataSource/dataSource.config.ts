import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const { DB_HOST } = process.env;

const config: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: 'portfolio_admin',
  password: 'NijO9JasFfaBZgKvA',
  database: 'portfolio_db',
  synchronize: false,
  entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '..', '/migrations/**/*{.ts,.js}')],
};

export default config;
