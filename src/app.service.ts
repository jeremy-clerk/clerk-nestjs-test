import { Injectable } from '@nestjs/common';
import { clerkClient } from '@clerk/express';

@Injectable()
export class AppService {
  getRoot(auth: any): string {
    return auth;
  }

  async getUser(auth: any) {
    const user = await clerkClient.users.getUser(auth.userId);
    return user;
  }
}
