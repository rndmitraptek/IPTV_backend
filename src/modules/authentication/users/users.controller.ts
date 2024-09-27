import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { users } from 'src/database/iptv/users.entity';
import { JwtAuthGuard } from './jwt-auth.gruard';
import { loginDto, usersDtoInsert } from './users.dto';
import { response_login_model } from './users.model';
import { UsersService } from './users.service';


@Controller('/authentication/users')
@ApiTags('Authentication/users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Get()
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all users.', type: [users] })
    findAll(): Promise<users[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan User by id user' })
    @ApiResponse({ status: 200, description: 'Return a single user.', type: users })
    @Get(':uuid')
    findOne(@Param('uuid') uuid: string): Promise<users> {
        return this.usersService.findOne(uuid);
    }

    @Post()
    @ApiOperation({ summary: 'tambah data users' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: users })  
    create(@Body() user: usersDtoInsert): Promise<users> {
        return this.usersService.create(user);
    }

    @Post('login')
    @ApiOperation({ summary: 'login users' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: response_login_model })  
    login(@Body() user: loginDto): Promise<response_login_model> {
        return this.usersService.login(user);
    }

    @Put(':uuid')
    @ApiOperation({ summary: 'Update data user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: users })
    update(@Param('uuid') uuid: string, @Body() user: users) {
        return this.usersService.update(uuid, user);
    }

    @ApiOperation({ summary: 'Delete data user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
    @Delete(':uuid')
    remove(@Param('uuid') id: string) {
        return this.usersService.remove(id);
    }
}
