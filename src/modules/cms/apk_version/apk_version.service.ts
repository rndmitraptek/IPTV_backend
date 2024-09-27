import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { apk_version } from 'src/database/iptv/apk_version.entity';
import { BuckectName } from 'src/utility/constant';
import { BufferedFile } from 'src/utility/minio-client.model';
import { MinioClientService } from 'src/utility/minio-client.utils';
import { apk_versionDtoInsert } from './apk_version.dto';

@Injectable({ scope: Scope.REQUEST })
export class ApkVersionService {
    constructor(
        @InjectModel(apk_version)
        private apk_versionModel: typeof apk_version,
        private minioClientService: MinioClientService,
    ) {}
    
    findAll(): Promise<apk_version[]> {
        try {
            return this.apk_versionModel.findAll({
                where:{
                    is_active:true
                }
            });            
        } catch (error) {
            throw error;
        }
    }

    async create(_apk_version: apk_versionDtoInsert,file:{ file?: BufferedFile[]}): Promise<apk_version> {
        let minio_image = await this.minioClientService.upload(file.file[0], BuckectName.APK);
        console.log(minio_image);
        if (minio_image.url){
            _apk_version.file = minio_image.fileName;
        }
        _apk_version.is_active = true;
        return this.apk_versionModel.create(_apk_version);
    }

    async getLastVersion():Promise<apk_version>{
        let data = await this.apk_versionModel.findOne({
            order:[
                ['id_apk_version','DESC']
            ]
        });
        data.file = await this.minioClientService.getLinkFoto(BuckectName.APK, data.file);
        return data;
    }
    
}
            