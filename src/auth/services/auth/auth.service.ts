import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  CLIENT_ID = process.env.CLIENT_ID;
  CLIENT_SECRET = process.env.CLIENT_SECRET;
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async generateToken(code: string) {
    const data = this.httpService
      .post(
        `https://github.com/login/oauth/access_token?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&code=${code}`,
      )
      .pipe(
        map((response) => {
          return response.data;
        }),
      );

    let token = await data.toPromise();
    token = token.split('=');
    token = token[1].split('&');
    token = token[0];
    await this.cacheManager.set('access_token', token);
  }

  async getToken() {
    const token = await this.cacheManager.get('access_token');
    return token;
  }

  async getUserData(token: string) {
    const data = this.httpService
      .get(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((response) => {
          return response.data;
        }),
      );

    return await data.toPromise();
  }
}
