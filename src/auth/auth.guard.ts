import { authenticateRequest, clerkClient, ClerkClient } from '@clerk/express';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { CLERK_CLIENT } from 'src/integrations/clerk/clerk.provider';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    @Inject(CLERK_CLIENT) private readonly clerkClient: ClerkClient,
    private readonly reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();

      const auth = await authenticateRequest({ clerkClient, request });

      request.auth = auth.toAuth();

      return !!request.auth.userId;
    } catch (error) {
      console.error('ERROR', error);
      return true;
      throw new UnauthorizedException();
    }
  }
}
