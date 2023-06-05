import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Guideline: Define return value type to detect wrong try-catch
   * 
   * If I do not define return value type, there is no error from TS.
   * 
   * Once I define return value type, the program does not compile because of TS.
   */
  getHello(): string {
    try {
      throw new Error("something bad happened in service");
    } catch (error) {
      console.error(error);
    }
  }
}
