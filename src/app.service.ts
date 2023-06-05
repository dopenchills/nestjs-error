import { BadRequestException, Injectable } from '@nestjs/common';

/**
 * Guideline: avoid using HTTPException in service.
 * 
 * Imagine this service is not directly from controller, but called from another service.
 * 
 * `BadRequestException` is not a error that the another service wants to catch 
 *   because HTTPException is there for the client.
 */
@Injectable()
export class AppService {
  getHello(id: string): string {
    if (id.includes('-')) {
      throw new BadRequestException('id should not include hyphen');
    }

    return id;
  }
}
