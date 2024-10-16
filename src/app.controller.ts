import { Controller, Get, Request, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(@Request() req): string {
    return this.appService.getRoot(req.auth);
  }

  @Post()
  postRoot(@Request() req) {
    return { auth: req.auth };
  }

  @Put()
  putRoot(@Request() req) {
    return { auth: req.auth };
  }
}
