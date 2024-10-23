import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { MenuService } from './menu.service';
import { insertMenu, updateMenu } from './menu.dto';
import { Request } from 'express';

@Controller('cms/menu')
@ApiTags('cms-menu')
export class MenuController {
    constructor(private readonly menuService:MenuService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all promo.', type:null })
    getMenu(): Promise<any> {
        return this.menuService.getMenu();
    }


    @Get(':id_menu')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan data by id' })
    @ApiResponse({ status: 200 })
    getById(@Param('id_menu') id_menu:number): Promise<any> {
        return this.menuService.getById(id_menu);
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan data by id' })
    @ApiResponse({ status: 200 })
    insert(@Body() body:insertMenu, @Req() req:Request): Promise<any> {
        return this.menuService.insert(body,req);
    }


    @Put(':id_menu')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan data by id' })
    @ApiResponse({ status: 200 })
    update(@Param('id_menu') id_menu:number,@Body() body:updateMenu, @Req() req:Request): Promise<any> {
        return this.menuService.update(id_menu,body,req);
    }
    
}
