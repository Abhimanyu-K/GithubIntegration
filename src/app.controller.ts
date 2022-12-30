import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  CLIENT_ID = process.env.CLIENT_ID;

  @Get()
  @Render('pages/login')
  root() {
    return { client_id: this.CLIENT_ID };
  }
}
