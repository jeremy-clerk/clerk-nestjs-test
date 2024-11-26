import { Controller, Get, Request, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getRoot(@Request() req) {
    return await this.appService.getUser(req.auth);
  }

  @Post()
  postRoot(@Request() req) {
    return this.getRoot(req);
  }

  @Put()
  putRoot(@Request() req) {
    return { auth: req.auth };
  }
}
