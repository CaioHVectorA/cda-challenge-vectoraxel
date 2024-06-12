import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    Logger.log(this.appService.getHello());
    return this.appService.getHello();
  }
  @Get('/test')
  getTest(): string {
    return 'This is a test2';
  }
}
