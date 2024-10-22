import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { users } from 'src/database/iptv/users.entity';
import { Request } from 'express';
import { UserDeviceService } from './user-device.service';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { createUserDeviceRoom, updateUserDeviceRoom } from './user-device.dto';


@Controller('admin/user-device')
@ApiTags('admin-user-device')
export class UserDeviceController {
    constructor(private readonly usersService:UserDeviceService){}



    @Get('getUserRoom')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'get user room device' })
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


    @Post('insertUserRoom')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'create user room device (only is_admin)' })
    @ApiResponse({ status: 201, description: 'success'})  
    insertUserRoom(@Body() body:createUserDeviceRoom,@Req() req:Request) {
        // console.log(req);
        return this.usersService.insertUserRoom(body,req);
    }


    @Put('updateUserRoom')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update user room device (password optional)' })
    @ApiResponse({ status: 201, description: 'success'})  
    updateUserRoom(@Body() body:updateUserDeviceRoom,@Req() req:Request) {
        // console.log(req);
        return this.usersService.updateUserRoom(body,req);
    }


    @Delete('deactived/:id_user_device')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Deactived user room device ' })
    @ApiResponse({ status: 201, description: 'success'})  
    deactived(@Param('id_user_device') id_user_device:number,@Req() req:Request) {
        // console.log(req);
        return this.usersService.deactived(id_user_device,req);
    }


    @Put('actived/:id_user_device')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'actived user room device ' })
    @ApiResponse({ status: 201, description: 'success'})  
    actived(@Param('id_user_device') id_user_device:number,@Req() req:Request) {
        // console.log(req);
        return this.usersService.actived(id_user_device,req);
    }
}