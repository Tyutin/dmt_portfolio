import { DataSourceOptions } from "typeorm";
import { join } from "path";

export const dataSourceConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: 'portfolio_admin',
  password: 'NijO9JasFfaBZgKvA',
  database: 'portfolio_db',
  synchronize: false,
  logging: false,
  entities: [join(__dirname, '/entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
  subscribers: [],
}