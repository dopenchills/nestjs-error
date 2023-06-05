import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Guideline: Throw HTTPException in controller
   */
  @Get()
  getHello(): number {
    try {
      throw new Error("Something bad happened");
    } catch (error) {
      // throw HTTPException
      throw new InternalServerErrorException("There is a problem in the server side.");
    }
  }
}

/**
 * 
 * The code above returns below.
 * 
 * This is readable for the client side
 * 
 * {
    "statusCode": 500,
    "message": "There is a problem in the server side.",
    "error": "Internal Server Error"
  }
 */
