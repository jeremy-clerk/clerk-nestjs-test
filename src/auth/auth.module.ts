import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClerkClient } from '../integrations/clerk/clerk.provider';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [ConfigModule],
  providers: [
    AuthService,
    ClerkClient,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
