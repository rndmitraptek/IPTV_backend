import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';

@Controller('admin')
@ApiTags('=======================API FOR ADMINISTRATOR / DEVELOPER=================')
export class BatasAdminController {
    
    constructor(){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    findAll(@Req() req:Request){
        return 'batas';
    }


}
