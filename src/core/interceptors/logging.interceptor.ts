import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('------------ Before...');
    const now = Date.now();
    this.logger.log('this is login interceptor log Before', now);
    return next.handle().pipe(
      tap(() => {
        console.log(`---------- After... ${Date.now() - now}ms`);
        this.logger.log(`this is login interceptor log After... ${Date.now() - now}ms`);
      }),
    );
  }
}
