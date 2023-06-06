## Guideline: Both throw HTTPException and log error in controller

```ts
import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Guideline: Both throw HTTPException and log error in controller
   */
  @Get()
  getHello(): number {
    try {
      throw new Error("Something bad happened");
    } catch (error) {
      // log error (for server-side developer)
      console.error(error);

      // throw HTTPException (for client)
      throw new InternalServerErrorException("There is a problem in the server side.");
    }
  }
}

/**
 * 
 * The code above returns below.
 * 
 * This is readable for the client side.
 * 
 * {
    "statusCode": 500,
    "message": "There is a problem in the server side.",
    "error": "Internal Server Error"
  }
 * 
 * This logic also logs good information about error as below
 * 
 * Error: Something bad happened
    at AppController.getHello (/Users/ryosakaguchi/dev/lab/nestjs-error/src/app.controller.ts:14:13)
    at /Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at InterceptorsConsumer.intercept (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/@nestjs/core/interceptors/interceptors-consumer.js:11:20)
    at /Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/@nestjs/core/router/router-execution-context.js:46:60
    at /Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/layer.js:95:5)
    at next (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/route.js:144:13)
    at Route.dispatch (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/route.js:114:3)
    at Layer.handle [as handle_request] (/Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/layer.js:95:5)
    at /Users/ryosakaguchi/dev/lab/nestjs-error/node_modules/express/lib/router/index.js:284:15
 * 
 */
```


## Guideline: include related data both to log and to error message

```ts
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
```

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIds(): number[] {
    return [1, 2, 3];
  }
}
```


## Guideline: Avoid blindlessly using try-catch in service

```ts
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
```

```ts
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
 * If we do not write simple try-catch in the service side, it returns Exception as expected like below:
 * 
 * {
      "statusCode": 500,
      "message": "something was wrong in the logic",
      "error": "Internal Server Error"
    }
 */
```
