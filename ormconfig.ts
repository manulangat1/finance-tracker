// import { registerAs } from '@nestjs/config';
// import { config as dotenvConfig } from 'dotenv';
// import { DataSource, DataSourceOptions } from 'typeorm';

// dotenvConfig({
//   path: '.env',
// });

// const config = {
//   type: 'postgres',
//   host: `${process.env.DATABASE_HOST}`,
//   port: Number(`${process.env.DATABASE_PORT}`),
//   username: `${process.env.DATABASE_USERNAME}`,
//   password: `${process.env.DATABASE_PASSWORD}`,
//   database: `${process.env.DATABASE_NAME}`,
//   entities: ['./dist/database/entities/*{.ts,.js}'],
//   migrations: ['./dist/database/migrations/*{.ts,.js}'],
//   autoLoadEntities: true,
//   synchronize: false,
// };

// export default registerAs('typeorm', () => config);
// export const connectionSource = new DataSource(config as DataSourceOptions);

import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ['dist/src/database/entities/*{.ts,.js}'],
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
