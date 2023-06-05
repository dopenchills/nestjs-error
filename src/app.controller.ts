import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Guideline: Avoid blindlessly using try-catch in service
   */
  @Get()
  getHello() {
    try {
      return this.appService.getHello();
    } catch (error) {
      throw new InternalServerErrorException("something was wrong in the logic");
    }
  }
}

/**
 * When we call the endpoint above, it surprisingly returns nothing
 *  even though it should return `InternalServerErrorException`.
 * 
 * This is because, the error is handled in the service side in a wrong way (simple try-catch).
 * 
 * If we do not write simple try-catch in the service side, it returns Exception as expected.
 */
