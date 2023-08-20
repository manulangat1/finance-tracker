/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';

import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     customProps: (req, res) => ({
    //       context: 'HTTP',
    //     }),
    //     transport: {
    //       target: 'pino-pretty',
    //       options: {
    //         singleLine: true,
    //       },
    //     },
    //   },
    // }),
  ],
})
export class LoggingModule {}
