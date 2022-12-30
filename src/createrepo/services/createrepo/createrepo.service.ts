import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repo } from 'src/typeorm/Repo';
import { Repository } from 'typeorm';

@Injectable()
export class CreaterepoService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Repo) private readonly userRepository: Repository<Repo>,
  ) {}

  async createRepo(token: string) {
    const data = this.httpService
      .post(
        `https://api.github.com/user/repos`,
        {
          name: 'Test App',
          description: 'This is your first repo!',
          homepage: 'https://github.com',
          private: false,
          is_template: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .pipe(
        map((response) => {
          return response.data;
        }),
      );

    const repoData = await data.toPromise();

    return repoData;
  }

  saveToDB(repoData) {
    console.log(repoData);
    const newRepo = this.userRepository.create({
      title: repoData.name,
      description: repoData.description,
    });
    return this.userRepository.save(newRepo);
  }
}
