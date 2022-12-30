import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
