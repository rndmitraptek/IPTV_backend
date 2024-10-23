import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { ApkService } from './apk.service';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';

@Controller('tv')
@ApiTags('tv')
export class ApkController {
    constructor(
        private readonly apkService:ApkService
    ){}

    @Get('getData')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan tv_channel by id tv_channel' })
    @ApiResponse({ status: 200, description: 'Return a single tv_channel.', type: null })
    getData(@Req() req:Request): Promise<tv_channel> {
        return this.apkService.getData(req);
    }
}
