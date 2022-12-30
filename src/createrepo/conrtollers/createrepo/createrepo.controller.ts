import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CreaterepoService } from 'src/createrepo/services/createrepo/createrepo.service';
import { Request, Response } from 'express';

@Controller('createrepo')
export class CreaterepoController {
  constructor(
    private authService: AuthService,
    private createRepoService: CreaterepoService,
  ) {}

  @Post('')
  async createRepoHandler(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.getToken();

    const repoData = await this.createRepoService.createRepo(token + '');

    await this.createRepoService.saveToDB(repoData);
    res.render('pages/repocreated.ejs', { repoData: repoData });
  }
}
