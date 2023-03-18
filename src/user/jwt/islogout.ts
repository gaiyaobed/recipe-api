import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class Islogout {
  constructor() {
    this.client.connect();
  }

  client = createClient();

  // rclient = redis.createClient({
  //   host: 'localhost',
  //   port: 6379,
  // });
  async isTokenBackListed(token: any): Promise<any> {
    // await this.client.connect();
    const accessToken = await this.client.sIsMember('jwt', token);
    if (accessToken) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async backlistToken(token: any): Promise<unknown> {
    try {
      return await this.client.sAdd('jwt', token);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e.stack);
    }
  }
}
