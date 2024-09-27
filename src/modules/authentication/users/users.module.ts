import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { users } from 'src/database/iptv/users.entity';
import { JwtAuthGuard } from './jwt-auth.gruard';
import { JwtStrategy } from './jwt.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
dotenv.config();

@Module({
  imports:[
    SequelizeModule.forFeature([users]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {},
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtAuthGuard,JwtStrategy]
})
export class UsersModule {}
