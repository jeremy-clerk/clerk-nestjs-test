import { ClerkClient } from '@clerk/backend';
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
import { reqTransformer } from '../util/utils';
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

      const prefix =
        this.configService.get('environment') === 'production'
          ? 'https://'
          : 'http://';

      request.url = new URL(
        `${prefix}${process.env.HOST || request.hostname || 'localhost'}${request.url}`,
      );

      const modifiedRequest = await reqTransformer(request);

      const auth = await this.clerkClient.authenticateRequest(modifiedRequest);

      request.auth = auth.toAuth();

      return true;
    } catch (error) {
      console.error('ERROR', error);
      return true;
      throw new UnauthorizedException();
    }
  }
}
