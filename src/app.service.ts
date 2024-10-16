import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(auth: any): string {
    return auth;
  }
}
