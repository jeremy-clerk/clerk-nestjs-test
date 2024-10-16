import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClerkClient as ClerkClientNative,
  createClerkClient,
} from '@clerk/backend';

export const CLERK_CLIENT = 'ClerkClient';

export const ClerkClient: Provider = {
  provide: CLERK_CLIENT,
  useFactory: (configService: ConfigService): ClerkClientNative => {
    const publishableKey = configService.get<string>('clerk.publishableKey');
    if (!publishableKey) {
      throw new Error(
        'clerk.publishableKey environment variable is not defined',
      );
    }
    const secretKey = configService.get<string>('clerk.secretKey');
    if (!secretKey) {
      throw new Error('clerk.secretKey environment variable is not defined');
    }

    return createClerkClient({ publishableKey, secretKey });
  },
  inject: [ConfigService],
};
