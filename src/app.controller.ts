import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Guideline: Avoid just throwing an error in catch clause.
   */
  @Get()
  getHello(): string {
    try {
      throw new Error("something bad happened");
    } catch (error) {
      throw new Error("I heard that something bad happened");
    }
  }
}

/**
 * The method above generate logs below. In the log, original error was hidden by new error.
 * 
 * [Nest] 36783  - 2023/06/05 21:03:32   ERROR [ExceptionsHandler] I heard that something bad happened
    Error: I heard that something bad happened
    at AppController.getHello (/Users/ryosakaguchi/dev/lab/nestjs-error/src/app.controller.ts:16:13)
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
