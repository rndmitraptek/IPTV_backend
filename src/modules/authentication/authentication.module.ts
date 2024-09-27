import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'src/database/iptv/users.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
    imports:[
        SequelizeModule.forFeature([
            users
        ]),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {},
      }),
      ],
      controllers: [UsersController],
      providers: [UsersService]
})
export class AuthenticationModule {}
