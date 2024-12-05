import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { nearby_attraction } from 'src/database/iptv/nearby_attraction.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { nearby_attractionDtoInsert } from './nearby_attraction.dto';
import { NearbyAttractionService } from './nearby_attraction.service';
import { Request } from 'express';

@Controller('cms/nearbyAttraction')
@ApiTags('cms-nearbyAttraction')
export class NearbyAttractionController {
    
    constructor(private readonly nearby_attractionService:NearbyAttractionService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all nearby_attraction.', type: [nearby_attraction] })
    findAll(@Req() req:Request): Promise<nearby_attraction[]> {
        return this.nearby_attractionService.findAll(req);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan nearby_attraction by id nearby_attraction' })
    @ApiResponse({ status: 200, description: 'Return a single nearby_attraction.', type: nearby_attraction })
    @Get(':id_nearby_attraction')
    findOne(@Param('id_nearby_attraction') id_nearby_attraction: number): Promise<nearby_attraction> {
        return this.nearby_attractionService.findOne(id_nearby_attraction);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data nearby_attraction' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: nearby_attraction })  
    create(@Body() nearby_attraction: nearby_attractionDtoInsert,@Req() req:Request): Promise<nearby_attraction> {
        return this.nearby_attractionService.create(nearby_attraction,req);
    }

    @Put(':id_nearby_attraction')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data nearby_attraction' })
    @ApiResponse({ status: 200, description: 'The nearby_attraction has been successfully updated.', type: nearby_attraction })
    update(@Param('id_nearby_attraction') id_nearby_attraction: number, @Body() nearby_attraction: nearby_attractionDtoInsert) {
        return this.nearby_attractionService.update(id_nearby_attraction, nearby_attraction);
    }

    @ApiOperation({ summary: 'Delete data DtoInsert' })
    @ApiResponse({ status: 200, description: 'The DtoInsert has been successfully deleted.' })
    @Delete(':id_nearby_attraction')
    remove(@Param('id_nearby_attraction') id: number) {
        return this.nearby_attractionService.remove(id);
    }
            
}
