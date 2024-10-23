import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { users } from 'src/database/iptv/users.entity';
import { JwtAuthGuard } from './jwt-auth.gruard';
import { loginDto, usersDtoInsert, usersDtoUpdate } from './users.dto';
import { response_login_model } from './users.model';
import { UsersService } from './users.service';
import { Request } from 'express';


@Controller('cms/users')
@ApiTags('cms-users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all users.', type: [users] })
    findAll(@Req() req:Request): Promise<users[]> {
        return this.usersService.findAll(req);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan User by id user' })
    @ApiResponse({ status: 200, description: 'Return a single user.', type: users })
    @Get(':id_user')
    findOne(@Param('id_user') id_user: number): Promise<users> {
        return this.usersService.findOne(id_user);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data users' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: users })  
    create(@Body() user: usersDtoInsert,@Req() req:Request): Promise<users> {
        return this.usersService.create(user,req);
    }

    @Post('login')
    @ApiOperation({ summary: 'login users {username:uwik,password:mat1234_}' })
    @ApiResponse({ status: 201, description: `The user has been successfully created. {"username":"uwik","password":"mat1234_"}`, type: response_login_model })  
    login(@Body() user: loginDto): Promise<response_login_model> {
        return this.usersService.login(user);
    }

    @Put(':id_user')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: users })
    update(@Param('id_user') id_user: number, @Body() user: usersDtoUpdate) {
        return this.usersService.update(id_user, user);
    }

    @ApiOperation({ summary: 'Delete data user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
    @Delete(':id_user')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    remove(@Param('id_user') id: number) {
        return this.usersService.remove(id);
    }


}
