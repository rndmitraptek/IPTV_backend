import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { info_hotel } from 'src/database/iptv/info_hotel.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { info_hotelDtoInsert } from './info_hotel.dto';
import { InfoHotelService } from './info_hotel.service';
import { Request } from 'express';

@Controller('cms/guest/infoHotel')
@ApiTags('cms-guest/infoHotel')
export class InfoHotelController {
    
    constructor(private readonly info_hotelService:InfoHotelService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all info_hotel.', type: [info_hotel] })
    findAll(@Req() req:Request): Promise<info_hotel> {
        return this.info_hotelService.findAll(req);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan info_hotel by id info_hotel' })
    @ApiResponse({ status: 200, description: 'Return a single info_hotel.', type: info_hotel })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<info_hotel> {
        return this.info_hotelService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data info_hotel' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: info_hotel })  
    create(@Body() info_hotel: info_hotelDtoInsert,@Req() req:Request): Promise<info_hotel> {
        return this.info_hotelService.create(info_hotel,req);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data info_hotel' })
    @ApiResponse({ status: 200, description: 'The info_hotel has been successfully updated.', type: info_hotel })
    update(@Param('id') id: number, @Body() info_hotel: info_hotelDtoInsert) {
        return this.info_hotelService.update(id, info_hotel);
    }

}
