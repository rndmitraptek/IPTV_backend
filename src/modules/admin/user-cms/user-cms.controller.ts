import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { users } from 'src/database/iptv/users.entity';
import { Request } from 'express';
import { UserCmsService } from './user-cms.service';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { usersCmsDtoInsert, usersCmsDtoUpdate } from './user-cms.dto';


@Controller('admin/user-cms')
@ApiTags('admin-user-cms')
export class UserCmsController {
    constructor(private readonly _UserCmsService:UserCmsService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all users.', type: [users] })
    findAll(@Req() req:Request): Promise<users[]> {
        return this._UserCmsService.findAll(req);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan User by id user' })
    @ApiResponse({ status: 200, description: 'Return a single user.', type: users })
    @Get(':id_user')
    findOne(@Param('id_user') id_user: number): Promise<users> {
        return this._UserCmsService.findOne(id_user);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data users' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: users })  
    create(@Body() user: usersCmsDtoInsert,@Req() req:Request): Promise<users> {
        return this._UserCmsService.create(user,req);
    }

    @Put(':id_user')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: users })
    update(@Param('id_user') id_user: number, @Body() user: usersCmsDtoUpdate) {
        return this._UserCmsService.update(id_user, user);
    }

    @ApiOperation({ summary: 'Delete data user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
    @Delete(':id_user')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    remove(@Param('id_user') id: number) {
        return this._UserCmsService.remove(id);
    }
}
