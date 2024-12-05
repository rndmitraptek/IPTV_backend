import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { promo } from 'src/database/iptv/promo.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { promoDtoInsert } from './promo.dto';
import { PromoService } from './promo.service';
import { Request } from 'express';

@Controller('cms/promo')
@ApiTags('cms-promo')
export class PromoController {
    
    constructor(private readonly promoService:PromoService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all promo.', type: [promo] })
    findAll(@Req() req:Request): Promise<promo[]> {
        return this.promoService.findAll(req);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan promo by id promo' })
    @ApiResponse({ status: 200, description: 'Return a single promo.', type: promo })
    @Get(':id_promo')
    findOne(@Param('id_promo') id_promo: string): Promise<promo> {
        return this.promoService.findOne(id_promo);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data promo' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: promo })  
    create(@Body() promo: promoDtoInsert, @Req() req:Request): Promise<promo> {
        return this.promoService.create(promo,req);
    }

    @Put(':id_promo')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data promo' })
    @ApiResponse({ status: 200, description: 'The promo has been successfully updated.', type: promo })
    update(@Param('id_promo') id_promo: string, @Body() promo: promoDtoInsert) {
        return this.promoService.update(id_promo, promo);
    }

    @ApiOperation({ summary: 'Delete data DtoInsert' })
    @ApiResponse({ status: 200, description: 'The DtoInsert has been successfully deleted.' })
    @Delete(':id_promo')
    remove(@Param('id_promo') id: string) {
        return this.promoService.remove(id);
    }

    @Put('updateStatusActive/:id_channel')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data tv_channel' })
    @ApiResponse({ status: 200, description: 'The tv_channel has been successfully updated.', type: promo })
    updateStatusActive(@Param('id_channel') id_channel: number) {
        return this.promoService.updateStatusActive(id_channel);
    }
}

