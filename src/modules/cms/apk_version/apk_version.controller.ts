import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { apk_version } from 'src/database/iptv/apk_version.entity';
import { BufferedFile } from 'src/utility/minio-client.model';
import { MinioClientService } from 'src/utility/minio-client.utils';
import { apk_versionDtoInsert } from './apk_version.dto';
import { ApkVersionService } from './apk_version.service';

@Controller('apk/apk_version')
@ApiTags('apk')
export class ApkVersionController {
    constructor(
        private readonly apk_versionService:ApkVersionService,
        private minioClientService: MinioClientService
    ){}

    @ApiOperation({ summary: 'Menampilkan apk_version by id apk_version' })
    @ApiResponse({ status: 200, description: 'Return a single apk_version.', type: apk_version })
    @Get()
    findOne(): Promise<apk_version[]> {
        return this.apk_versionService.findAll();
    }

    @ApiOperation({ summary: 'Menampilkan apk_version by id apk_version' })
    @ApiResponse({ status: 200, description: 'Return a single apk_version.', type: apk_version })
    @Get('last')
    last(): Promise<apk_version> {
        return this.apk_versionService.getLastVersion();
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'file', maxCount: 1 },
    ]))
    @ApiOperation({ summary: 'tambah data apk_version' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: apk_version })  
    create(
        @Body() apk_version: apk_versionDtoInsert,
        @UploadedFiles() file: { 
            file: BufferedFile[]
        }
    ): Promise<apk_version> {
        return this.apk_versionService.create(apk_version,file);
    }

    @ApiOperation({ summary: 'Menampilkan apk_version by id apk_version' })
    @ApiResponse({ status: 200, description: 'Return a single apk_version.', type: apk_version })
    @Get('presignedUrl/:bucket/:filename')
    presignedUrl(@Param('bucket') bucket:string,@Param('filename') filename:string): Promise<any> {
        return this.minioClientService.generatePresignedUrl(bucket,filename);
    }

    @ApiOperation({ summary: 'Menampilkan apk_version by id apk_version' })
    @ApiResponse({ status: 200, description: 'Return a single apk_version.', type: apk_version })
    @Get('presignedUrlGet/:bucket/:filename')
    presignedUrlGet(@Param('bucket') bucket:string,@Param('filename') filename:string): Promise<any> {
        return this.minioClientService.generatePresignedUrlGet(bucket,filename);
    }
}
            