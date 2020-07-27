import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { NavigationModule } from './navigation/navigation.module';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { join } from 'path';

const metadata: ModuleMetadata = {
  imports: [
    GraphQLModule.forRoot({
      include: [NavigationModule],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'interface', // 'class'
      },
      playground: {
        settings: {
          'request.credentials': 'include'
        }
      }
    }),
    DatabaseModule,
    NavigationModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
}
@Module(metadata)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
