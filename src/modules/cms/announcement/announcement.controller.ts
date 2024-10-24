import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';
import { AnnouncementService } from './announcement.service';
import { insertAnnouncement } from './announcement.dto';

@Controller('cms/announcement')
@ApiTags('cms-announcement')
export class AnnouncementController {
    
    constructor(private readonly _AnnouncementService:AnnouncementService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, })
    findAll(@Req() req:Request): Promise<any> {
        return this._AnnouncementService.findAll(req);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan by id' })
    @ApiResponse({ status: 200 })
    @Get(':id_background')
    findOne(@Param('id_background') id_background: number): Promise<any> {
        return this._AnnouncementService.findOne(id_background);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data body' })
    @ApiResponse({ status: 201 })  
    create(@Body() body: insertAnnouncement,@Req() req:Request): Promise<any> {
        return this._AnnouncementService.create(body,req);
    }

    @Put(':id_background')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data body' })
    @ApiResponse({ status: 200 })
    update(@Param('id_background') id_background: number, @Body() body: insertAnnouncement, @Req() req:Request) {
        return this._AnnouncementService.update(id_background, body,req);
    }


    @Put('updateStatus/:id_background')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update status data' })
    @ApiResponse({ status: 200})
    updateStatusActive(@Param('id_background') id_background: number) {
        return this._AnnouncementService.updateStatusActive(id_background);
    }
            
}
