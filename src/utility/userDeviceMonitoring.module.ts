// user-device.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { UserDeviceMonitoringService } from './userDeviceMonitoring.helper';
import { apk_version } from 'src/database/iptv/apk_version.entity';
import { role } from 'src/database/iptv/role.entity';
import { users } from 'src/database/iptv/users.entity';
import { role_menu } from 'src/database/iptv/role_menu.entity';
import { tv_group } from 'src/database/iptv/tv_group.entity';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { promo } from 'src/database/iptv/promo.entity';
import { info_hotel } from 'src/database/iptv/info_hotel.entity';
import { info_room } from 'src/database/iptv/info_room.entity';
import { info_fasilities } from 'src/database/iptv/info_fasilities.entity';
import { resto } from 'src/database/iptv/resto.entity';
import { nearby_attraction } from 'src/database/iptv/nearby_attraction.entity';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { entertainment } from 'src/database/iptv/entertainment.entity';
import { menu } from 'src/database/iptv/menu.entity';
import { sessionDeviceEntity } from 'src/database/iptv/session_device.entity';
import { logLogoutEntity } from 'src/database/iptv/log_logout.entity';
import { logRefreshTokenEntity } from 'src/database/iptv/log_refresh_token.entity';
import { greeting_cardUserEntity } from 'src/database/iptv/greeting_card_user.entity';
import { backgroundEntity } from 'src/database/iptv/background.entity';
import { backgroundUserEntity } from 'src/database/iptv/background_user.entity';
import { announcementEntity } from 'src/database/iptv/announcement.entity';
import { announcementUserEntity } from 'src/database/iptv/announcement_user.entity';
import { users_guestEntity } from 'src/database/iptv/users_guest.entity';
import { warningEntity } from 'src/database/iptv/warning.entity';
import { paymentMethodEntity } from 'src/database/iptv/payment_method.entity';
import { restoGroupEntity } from 'src/database/iptv/resto_group.entity';
import { orderRestoEntity } from 'src/database/iptv/order_resto.entity';
import { orderRestoDetailEntity } from 'src/database/iptv/order_resto_detail.entity';
import { nomor_counter } from 'src/database/iptv/nomor_counter.entity';
import { logCallbackEntity } from 'src/database/iptv/log_failed_callback.entity';
import { hotelChannel_0Entity } from 'src/database/iptv/hotel_channel_0.entity';
import { GatewayModule } from './websocket.module';
import { log_connectionEntity } from 'src/database/iptv/log_connection.entity';
import { log_update_contentEntity } from 'src/database/iptv/log_update_content.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      apk_version,
      role,
      users,
      role_menu,
      tv_group,
      tv_channel,
      promo,
      info_hotel,
      info_room,
      info_fasilities,
      resto,
      nearby_attraction,
      greeting_card,
      iptv_feature,
      entertainment,
      menu,
      users_deviceEntity,
      sessionDeviceEntity,
      logLogoutEntity,
      logRefreshTokenEntity,
      greeting_cardUserEntity,
      backgroundEntity,
      backgroundUserEntity,
      announcementEntity,
      announcementUserEntity,
      users_guestEntity,
      warningEntity,
      paymentMethodEntity,
      restoGroupEntity,
      orderRestoEntity,
      orderRestoDetailEntity,
      nomor_counter,
      logCallbackEntity,
      hotelChannel_0Entity,
      log_connectionEntity,
      log_update_contentEntity,
    ]),
    // forwardRef(() => GatewayModule)
  ],
  providers: [UserDeviceMonitoringService],
  exports: [UserDeviceMonitoringService, SequelizeModule],
})
export class UserDeviceModule {}
