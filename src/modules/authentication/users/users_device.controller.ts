import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { users } from 'src/database/iptv/users.entity';
import { JwtAuthGuard } from './jwt-auth.gruard';
import { createUserRoom, loginDeviceDto, loginDto, updateUserRoom, usersDtoInsert, usersDtoUpdate } from './users.dto';
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
    tokenCheck(@Req() req:Request) {
        // console.log(req);
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


    @Get('getUserRoom')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'get user room device by id hotel from token' })
    @ApiResponse({ status: 201, description: 'success'})  
    getUserRoom(@Req() req:Request) {
        // console.log(req);
        return this.usersService.getUserRoom(req);
    }


    @Get('getById/:id_user_device')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'get user room device by id' })
    @ApiResponse({ status: 201, description: 'success'})  
    getById(@Param('id_user_device') id_user_device:number,@Req() req:Request) {
        // console.log(req);
        return this.usersService.getById(id_user_device,req);
    }


    // @Post('insertUserRoom')
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth('access-token')
    // @ApiOperation({ summary: 'create user room device (only is_admin)' })
    // @ApiResponse({ status: 201, description: 'success'})  
    // insertUserRoom(@Body() body:createUserRoom,@Req() req:Request) {
    //     // console.log(req);
    //     return this.usersService.insertUserRoom(body,req);
    // }


    @Put('updateUserRoom')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update user room device (password optional)' })
    @ApiResponse({ status: 201, description: 'success'})  
    updateUserRoom(@Body() body:updateUserRoom,@Req() req:Request) {
        // console.log(req);
        return this.usersService.updateUserRoom(body,req);
    }


    // @Delete('deactived/:id_user_device')
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth('access-token')
    // @ApiOperation({ summary: 'Deactived user room device ' })
    // @ApiResponse({ status: 201, description: 'success'})  
    // deactived(@Param('id_user_device') id_user_device:number,@Req() req:Request) {
    //     // console.log(req);
    //     return this.usersService.deactived(id_user_device,req);
    // }


    // @Put('actived/:id_user_device')
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth('access-token')
    // @ApiOperation({ summary: 'actived user room device ' })
    // @ApiResponse({ status: 201, description: 'success'})  
    // actived(@Param('id_user_device') id_user_device:number,@Req() req:Request) {
    //     // console.log(req);
    //     return this.usersService.actived(id_user_device,req);
    // }
}