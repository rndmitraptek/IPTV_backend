import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { users } from 'src/database/iptv/users.entity';
import { JwtAuthGuard } from './jwt-auth.gruard';
import { loginDeviceDto, loginDto, usersDtoInsert, usersDtoUpdate } from './users.dto';
import { Request } from 'express';
import { UserDeviceService } from './users_device.service';
import { JwtRefreshAuthGuard } from './jwt-auth.refresh.guard';


@Controller('device/user-device')
@ApiTags('device-users')
export class UserDeviceController {
    constructor(private readonly usersService:UserDeviceService){}


    @Post('login')
    @ApiOperation({ summary: 'login users device {username:room1,password:mat1234_}' })
    @ApiResponse({ status: 201, description: `success` })  
    login(@Body() user: loginDeviceDto, @Req() req: Request): Promise<any> {
        return this.usersService.login(user, req);
    }

    @Get('token-check')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'cek token' })
    @ApiResponse({ status: 201, description: 'success'})  
    tokenCheck() {
        return 'success';
    }


    @Post('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'refresh token' })
    @ApiResponse({ status: 201, description: 'success'})  
    refresh(@Req() req:Request) {
        return this.usersService.refresh(req);
    }
}