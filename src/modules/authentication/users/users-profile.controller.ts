import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { users } from 'src/database/iptv/users.entity';
import { JwtAuthGuard } from './jwt-auth.gruard';
import { loginDto, usersDtoInsert, usersDtoUpdate } from './users.dto';
import { response_login_model } from './users.model';
import { UsersService } from './users.service';
import { Request } from 'express';


@Controller('cms/profile')
@ApiTags('cms-users-profile')
export class UsersProfileController {
    constructor(private readonly usersService:UsersService){}


    @Get('getProfile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan profile and menu akses' })
    @ApiResponse({ status: 200, description: 'Return all users.' })
    getProfile(@Req() req:Request): Promise<any> {
        return this.usersService.getProfile(req);
    }
}
