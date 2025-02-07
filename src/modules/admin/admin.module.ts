import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { apk_version } from 'src/database/iptv/apk_version.entity';
import { entertainment } from 'src/database/iptv/entertainment.entity';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { info_fasilities } from 'src/database/iptv/info_fasilities.entity';
import { info_hotel } from 'src/database/iptv/info_hotel.entity';
import { info_room } from 'src/database/iptv/info_room.entity';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { menu } from 'src/database/iptv/menu.entity';
import { nearby_attraction } from 'src/database/iptv/nearby_attraction.entity';
import { promo } from 'src/database/iptv/promo.entity';
import { resto } from 'src/database/iptv/resto.entity';
import { role } from 'src/database/iptv/role.entity';
import { role_menu } from 'src/database/iptv/role_menu.entity';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { tv_group } from 'src/database/iptv/tv_group.entity';
import { MinioClientService } from 'src/utility/minio-client.utils';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { sessionDeviceEntity } from 'src/database/iptv/session_device.entity';
import { ApkVersionService } from '../cms/apk_version/apk_version.service';
import { HotelController } from './hotel/hotel.controller';
import { HotelService } from './hotel/hotel.service';
import { BatasAdminController } from './batas-admin';
import { UserCmsController } from './user-cms/user-cms.controller';
import { UserCmsService } from './user-cms/user-cms.service';
import { users } from 'src/database/iptv/users.entity';
import { UserDeviceController } from './user-device/user-device.controller';
import { UserDeviceService } from './user-device/user-device.service';
import { TvChannelAdminController } from './tv_channel_admin/tv_channel_admin.controller';
import { TvChannelAdminService } from './tv_channel_admin/tv_channel_admin.service';
import { tv_channelAdminRepository } from './tv_channel_admin/tv_channel_admin.repo';
import { AppGateway } from 'src/utility/websocket.helper';

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
    ]),
  ],
  controllers: [
    BatasAdminController,
    HotelController,
    UserCmsController,
    UserDeviceController,
    TvChannelAdminController,
  ],
  providers: [
    ApkVersionService,
    MinioClientService,
    HotelService,
    UserCmsService,
    UserDeviceService,
    AppGateway,
    tv_channelAdminRepository,
    TvChannelAdminService,
  ],
})
export class AdminModule {}
