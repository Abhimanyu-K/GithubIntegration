import { Controller, Get, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly httpService: HttpService,
    private authService: AuthService,
  ) {}

  @Get('signin/callback')
  async signInHandler(@Req() req: Request, @Res() res: Response) {
    const requestToken = req.query.code;

    await this.authService.generateToken(requestToken.toString());

    res.redirect('/auth/success');
  }

  @Get('success')
  async successHandler(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.getToken();
    const userData = await this.authService.getUserData(token + '');

    res.render('pages/user.ejs', { userData: userData });
  }
}
