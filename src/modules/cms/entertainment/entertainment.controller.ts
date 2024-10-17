import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { entertainment } from 'src/database/iptv/entertainment.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { entertainmentDtoInsert } from './entertainment.dto';
import { EntertainmentService } from './entertainment.service';

@Controller('cms/entertainment')
@ApiTags('cms-entertainment')
export class EntertainmentController {
    
    constructor(private readonly entertainmentService:EntertainmentService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all entertainment.', type: [entertainment] })
    findAll(): Promise<entertainment[]> {
        return this.entertainmentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan entertainment by id entertainment' })
    @ApiResponse({ status: 200, description: 'Return a single entertainment.', type: entertainment })
    @Get(':id_app')
    findOne(@Param('id_app') id_app: number): Promise<entertainment> {
        return this.entertainmentService.findOne(id_app);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data entertainment' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: entertainment })  
    create(@Body() entertainment: entertainmentDtoInsert): Promise<entertainment> {
        return this.entertainmentService.create(entertainment);
    }

    @Put(':id_app')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data entertainment' })
    @ApiResponse({ status: 200, description: 'The entertainment has been successfully updated.', type: entertainment })
    update(@Param('id_app') id_app: number, @Body() entertainment: entertainmentDtoInsert) {
        return this.entertainmentService.update(id_app, entertainment);
    }

    @ApiOperation({ summary: 'Delete data DtoInsert' })
    @ApiResponse({ status: 200, description: 'The DtoInsert has been successfully deleted.' })
    @Delete(':id_app')
    remove(@Param('id_app') id: number) {
        return this.entertainmentService.remove(id);
    }

    @Put('updateStatusActive/:id_app')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data tv_channel' })
    @ApiResponse({ status: 200, description: 'The tv_channel has been successfully updated.', type: entertainment })
    updateStatusActive(@Param('id_app') id_app: number) {
        return this.entertainmentService.updateStatusActive(id_app);
    }
            
}
