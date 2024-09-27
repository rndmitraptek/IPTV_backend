import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeConfigService } from './database/database.config';
import { LoggingMiddleware } from './middlewares/logging.middlewares';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CmsModule } from './modules/cms/cms.module';
import { MakeModule } from './modules/make/make.module';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {},
    }),
    CmsModule, 
    MakeModule, 
    AuthenticationModule],
  controllers: [AppController],
  providers: [AppService,SequelizeConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}