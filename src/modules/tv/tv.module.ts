import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { apk_version } from 'src/database/iptv/apk_version.entity';
import { entertainment } from 'src/database/iptv/entertainment.entity';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { info_fasilities } from 'src/database/iptv/info_fasilities.entity';
import { info_hotel } from 'src/database/iptv/info_hotel.entity';
import { info_room } from 'src/database/iptv/info_room.entity';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { nearby_attraction } from 'src/database/iptv/nearby_attraction.entity';
import { promo } from 'src/database/iptv/promo.entity';
import { resto } from 'src/database/iptv/resto.entity';
import { role } from 'src/database/iptv/role.entity';
import { role_menu } from 'src/database/iptv/role_menu.entity';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { tv_group } from 'src/database/iptv/tv_group.entity';
import { tv_channelRepository } from './apk/api.repository';
import { ApkController } from './apk/apk.controller';
import { ApkService } from './apk/apk.service';
import { backgroundEntity } from 'src/database/iptv/background.entity';
import { announcementEntity } from 'src/database/iptv/announcement.entity';
import { announcementUserEntity } from 'src/database/iptv/announcement_user.entity';
import { backgroundUserEntity } from 'src/database/iptv/background_user.entity';
import { greeting_cardUserEntity } from 'src/database/iptv/greeting_card_user.entity';
import { users_guestEntity } from 'src/database/iptv/users_guest.entity';

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
      greeting_cardUserEntity,
      iptv_feature,
      entertainment,
      backgroundEntity,
      backgroundUserEntity,
      announcementEntity,
      announcementUserEntity,
      users_guestEntity,
    ]),
  ],
  controllers: [ApkController],
  providers: [ApkService, tv_channelRepository],
})
export class TvModule {}
