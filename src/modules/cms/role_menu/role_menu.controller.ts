import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { role_menu } from 'src/database/iptv/role_menu.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { role_menuDtoInsert } from './role_menu.dto';
import { RoleMenuService } from './role_menu.service';

@Controller('cms/role-menu')
@ApiTags('cms/role-menu')
export class RoleMenuController {
    
    constructor(
        private readonly role_menuService:RoleMenuService
    ){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all role_menu.', type: [role_menu] })
    findAll(): Promise<role_menu[]> {
        return this.role_menuService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan role_menu by id_role_menu role_menu' })
    @ApiResponse({ status: 200, description: 'Return a single role_menu.', type: null })
    @Get('GetByIdRole/:id_role')
    GetByIdRole(@Param('id_role') id_role: number): Promise<role_menu[]> {
        return this.role_menuService.GetByIdRole(id_role);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan role_menu by id_role_menu role_menu' })
    @ApiResponse({ status: 200, description: 'Return a single role_menu.', type: role_menu })
    @Get(':id_role_menu')
    findOne(@Param('id_role_menu') id_role_menu: number): Promise<role_menu> {
        return this.role_menuService.findOne(id_role_menu);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data role_menu' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: role_menu })  
    create(@Body() role_menu: role_menuDtoInsert): Promise<role_menu> {
        return this.role_menuService.create(role_menu);
    }

    @Put(':id_role_menu')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data role_menu' })
    @ApiResponse({ status: 200, description: 'The role_menu has been successfully updated.', type: role_menu })
    update(@Param('id_role_menu') id_role_menu: number, @Body() role_menu: role_menuDtoInsert) {
        return this.role_menuService.update(id_role_menu, role_menu);
    }

    @Delete(':id_role_menu')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Delete data DtoInsert' })
    @ApiResponse({ status: 200, description: 'The DtoInsert has been successfully deleted.' })
    remove(@Param('id_role_menu') id_role_menu: number) {
        return this.role_menuService.remove(id_role_menu);
    }
            
}
