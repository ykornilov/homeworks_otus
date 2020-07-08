import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { NavigationModule } from './navigation/navigation.module';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const metadata: ModuleMetadata = {
  imports: [DatabaseModule, NavigationModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
}
@Module(metadata)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
