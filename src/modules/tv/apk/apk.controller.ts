import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { ApkService } from './apk.service';

@Controller('tv')
@ApiTags('tv')
export class ApkController {
    constructor(
        private readonly apkService:ApkService
    ){}

    @ApiOperation({ summary: 'Menampilkan tv_channel by id tv_channel' })
    @ApiResponse({ status: 200, description: 'Return a single tv_channel.', type: null })
    @Get('getData/:nomor_room')
    getData(@Param('nomor_room') nomor_room: string): Promise<tv_channel> {
        return this.apkService.getData(nomor_room);
    }
}
