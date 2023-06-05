import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Guideline: Avoid blindlessly using try-catch in service
   */
  getHello() {
    try {
      throw new Error("something bad happened in service");
    } catch (error) {
      console.error(error);
    }
  }
}
