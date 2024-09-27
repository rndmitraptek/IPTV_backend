import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { JwtAuthGuard } from '../authentication/users/jwt-auth.gruard';
import { JwtStrategy } from '../authentication/users/jwt.strategy';
import { CrudController } from './crud/crud.controller';
import { crudRepository } from './crud/crud.repository';
import { CrudService } from './crud/crud.service';
dotenv.config();

@Module({
  imports:[
    SequelizeModule.forFeature([
      
    ]),
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {},
    }),
  ],
  controllers: [CrudController],
  providers: [
    CrudService,
    crudRepository,
    JwtStrategy,
    JwtAuthGuard
  ]
})
export class MakeModule {}
