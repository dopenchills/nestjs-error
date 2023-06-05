import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIds(): number[] {
    return [1, 2, 3];
  }
}
