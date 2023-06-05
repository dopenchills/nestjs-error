import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Guideline: include related data both to log and to error message
   * 
   * With the additional data, it gets easier to analyze the cause of bugs.
   */
  @Get()
  calculateIds(): number[] {
    const ids = this.appService.getIds();

    try {
      // some operation have thrown error
      throw new Error("something bad happened");
    } catch (error) {
      console.log(`calculateIds failed with the ids: ${ids}`);
      console.error(error);

      throw new InternalServerErrorException(`calculateIds with failed with the ids: ${ids}`);
    }
  }
}

/**
 * Returned value:
 * 
 * {
    "statusCode": 500,
    "message": "calculateIds with failed with the ids: 1,2,3",
    "error": "Internal Server Error"
  }
 * 
 * Log:
 * 
 * calculateIds failed with the ids: 1,2,3
Error: something bad happened
    at AppController.calculateIds (/Users/ryosakaguchi/dev/lab/nestjs-error/src/app.controller.ts:19:13)
    at /Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at InterceptorsConsumer.intercept (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/@nestjs/core/interceptors/interceptors-consumer.js:11:20)
    at /Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/@nestjs/core/router/router-execution-context.js:46:60
    at /Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/layer.js:95:5)
    at next (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/route.js:144:13)
    at Route.dispatch (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/route.js:114:3)
    at Layer.handle [as handle_request] (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/layer.js:95:5)
    at /Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/index.js:284:15
 */
