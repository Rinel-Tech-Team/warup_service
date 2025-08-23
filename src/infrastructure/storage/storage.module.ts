import { Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: StorageService,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new StorageService(
          config.get<string>('SUPABASE_URL')!,
          config.get<string>('SUPABASE_KEY')!,
          config.get<string>('SUPABASE_BUCKET')!,
        ),
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
