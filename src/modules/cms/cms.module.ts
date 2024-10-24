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
import { ApkVersionController } from './apk_version/apk_version.controller';
import { ApkVersionService } from './apk_version/apk_version.service';
import { EntertainmentController } from './entertainment/entertainment.controller';
import { EntertainmentService } from './entertainment/entertainment.service';
import { GreetingCardController } from './greeting_card/greeting_card.controller';
import { GreetingCardService } from './greeting_card/greeting_card.service';
import { InfoFasilitiesController } from './info_fasilities/info_fasilities.controller';
import { InfoFasilitiesService } from './info_fasilities/info_fasilities.service';
import { InfoHotelController } from './info_hotel/info_hotel.controller';
import { InfoHotelService } from './info_hotel/info_hotel.service';
import { InfoRoomController } from './info_room/info_room.controller';
import { InfoRoomService } from './info_room/info_room.service';
import { IptvFeatureController } from './iptv_feature/iptv_feature.controller';
import { IptvFeatureService } from './iptv_feature/iptv_feature.service';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { NearbyAttractionController } from './nearby_attraction/nearby_attraction.controller';
import { NearbyAttractionService } from './nearby_attraction/nearby_attraction.service';
import { PromoController } from './promo/promo.controller';
import { PromoService } from './promo/promo.service';
import { RestoController } from './resto/resto.controller';
import { RestoService } from './resto/resto.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { RoleMenuController } from './role_menu/role_menu.controller';
import { role_menuRepository } from './role_menu/role_menu.repository';
import { RoleMenuService } from './role_menu/role_menu.service';
import { TvChannelController } from './tv_channel/tv_channel.controller';
import { tv_channelRepository } from './tv_channel/tv_channel.repository';
import { TvChannelService } from './tv_channel/tv_channel.service';
import { TvGroupController } from './tv_group/tv_group.controller';
import { TvGroupService } from './tv_group/tv_group.service';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { sessionDeviceEntity } from 'src/database/iptv/session_device.entity';
import { RestoGroupController } from './resto-group/resto-group.controller';
import { RestoGroupService } from './resto-group/resto-group.service';
import { restoGroupEntity } from 'src/database/iptv/resto_group.entity';
import { backgroundEntity } from 'src/database/iptv/background.entity';
import { BackgroundController } from './background/background.controller';
import { BackgroundService } from './background/background.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      apk_version,
      role,
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
      restoGroupEntity,
      backgroundEntity
    ]),
  ],
  controllers: [
    ApkVersionController,
    RoleController,
    RoleMenuController,
    TvGroupController,
    TvChannelController,
    PromoController,
    InfoHotelController,
    InfoRoomController,
    InfoFasilitiesController,
    RestoGroupController,
    RestoController,
    NearbyAttractionController,
    GreetingCardController,
    IptvFeatureController,
    EntertainmentController,
    MenuController,
    BackgroundController
  ],
  providers: [
    ApkVersionService,
    MinioClientService,
    RoleService,
    RoleMenuService,
    TvGroupService,
    TvChannelService,
    tv_channelRepository,
    PromoService,
    InfoHotelService,
    InfoRoomService,
    InfoFasilitiesService,
    RestoGroupService,
    RestoService,
    NearbyAttractionService,
    GreetingCardService,
    IptvFeatureService,
    role_menuRepository,
    EntertainmentService,
    MenuService,
    BackgroundService
  ],
})
export class CmsModule {}
