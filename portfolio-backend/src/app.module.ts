import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NextAuthModule } from './next-auth/next-auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [NextAuthModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
