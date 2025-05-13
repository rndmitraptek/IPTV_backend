import { forwardRef, Module } from '@nestjs/common';
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
import { role_menu } from 'src/database/iptv/role_menu.entity';
import { menu } from 'src/database/iptv/menu.entity';
import { UsersProfileController } from './users/users-profile.controller';
import { logLogoutEntity } from 'src/database/iptv/log_logout.entity';
import { logRefreshTokenEntity } from 'src/database/iptv/log_refresh_token.entity';
import { ApkService } from '../tv/apk/apk.service';
import { nearby_attraction } from 'src/database/iptv/nearby_attraction.entity';
import { apk_version } from 'src/database/iptv/apk_version.entity';
import { tv_group } from 'src/database/iptv/tv_group.entity';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { promo } from 'src/database/iptv/promo.entity';
import { info_hotel } from 'src/database/iptv/info_hotel.entity';
import { info_room } from 'src/database/iptv/info_room.entity';
import { info_fasilities } from 'src/database/iptv/info_fasilities.entity';
import { resto } from 'src/database/iptv/resto.entity';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { greeting_cardUserEntity } from 'src/database/iptv/greeting_card_user.entity';
import { entertainment } from 'src/database/iptv/entertainment.entity';
import { backgroundEntity } from 'src/database/iptv/background.entity';
import { backgroundUserEntity } from 'src/database/iptv/background_user.entity';
import { announcementEntity } from 'src/database/iptv/announcement.entity';
import { announcementUserEntity } from 'src/database/iptv/announcement_user.entity';
import { users_guestEntity } from 'src/database/iptv/users_guest.entity';
import { warningEntity } from 'src/database/iptv/warning.entity';
import { AppGateway } from 'src/utility/websocket.helper';
import { UserDeviceMonitoringService } from 'src/utility/userDeviceMonitoring.helper';
import { GatewayModule } from 'src/utility/websocket.module';
import { UserDeviceModule } from 'src/utility/userDeviceMonitoring.module';

@Module({
  imports: [
    // SequelizeModule.forFeature([
    //   users,
    //   role,
    //   menu,
    //   sessionDeviceEntity,
    //   logLogoutEntity,
    //   logRefreshTokenEntity,
    //   apk_version,
    //   role_menu,
    //   tv_group,
    //   tv_channel,
    //   promo,
    //   info_hotel,
    //   info_room,
    //   info_fasilities,
    //   resto,
    //   nearby_attraction,
    //   greeting_card,
    //   greeting_cardUserEntity,
    //   iptv_feature,
    //   entertainment,
    //   backgroundEntity,
    //   backgroundUserEntity,
    //   announcementEntity,
    //   announcementUserEntity,
    //   users_guestEntity,
    //   warningEntity,
    //   users_deviceEntity,
    // ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {},
    }),
    forwardRef(() => GatewayModule),
    forwardRef(() => UserDeviceModule),
  ],
  controllers: [UsersController, UsersProfileController, UserDeviceController],
  providers: [UsersService, UserDeviceService, ApkService],
})
export class AuthenticationModule {}
