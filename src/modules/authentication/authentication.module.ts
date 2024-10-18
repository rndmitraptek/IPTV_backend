import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { role } from 'src/database/iptv/role.entity';
import { users } from 'src/database/iptv/users.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserDeviceController } from './users/users_device.controller';
import { UserDeviceService } from './users/users_device.service';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { sessionDeviceEntity } from 'src/database/iptv/session_device.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([users, role, iptv_feature,users_deviceEntity,sessionDeviceEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {},
    }),
  ],
  controllers: [UsersController, UserDeviceController],
  providers: [UsersService, UserDeviceService],
})
export class AuthenticationModule {}
