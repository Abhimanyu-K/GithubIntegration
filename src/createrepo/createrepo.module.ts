import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repo } from 'src/typeorm/Repo';
import { CreaterepoController } from './conrtollers/createrepo/createrepo.controller';
import { CreaterepoService } from './services/createrepo/createrepo.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register(),
    TypeOrmModule.forFeature([Repo]),
  ],
  controllers: [CreaterepoController],
  providers: [CreaterepoService, AuthService],
})
export class CreaterepoModule {}
