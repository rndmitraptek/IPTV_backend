import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { apk_version } from 'src/database/iptv/apk_version.entity';
import { MinioClientService } from 'src/utility/minio-client.utils';
import { ApkVersionController } from './apk_version/apk_version.controller';
import { ApkVersionService } from './apk_version/apk_version.service';

@Module({
  imports:[
    SequelizeModule.forFeature([
      apk_version
    ])
  ],
  controllers: [ApkVersionController],
  providers: [ApkVersionService,MinioClientService]
})
export class CmsModule {}
