import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Guideline: use try-catch as guard in controller
   */
  @Get(':id')
  getHello(@Param('id') id: string): number {
    if(id.includes('-')) {
      throw new BadRequestException('id should not include hyphen');
    }

    return 0;
  }
}

/**
 * When calling `http://localhost:3000/-`, server returns as below.
 * 
 * {
    "statusCode": 400,
    "message": "id should not include hyphen",
    "error": "Bad Request"
  }
 * 
 * Advantages
 * 
 * - The error message is readable to the client.
 * 
 * - We can make sure that the id does not include hyphen in the following code.
 * 
 */