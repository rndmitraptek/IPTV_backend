import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { resto } from 'src/database/iptv/resto.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { restoDtoInsert } from './resto.dto';
import { RestoService } from './resto.service';

@Controller('cms/resto')
@ApiTags('cms-resto')
export class RestoController {
    
    constructor(private readonly restoService:RestoService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all resto.', type: [resto] })
    findAll(): Promise<resto[]> {
        return this.restoService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan resto by id resto' })
    @ApiResponse({ status: 200, description: 'Return a single resto.', type: resto })
    @Get(':id_resto')
    findOne(@Param('id_resto') id_resto: number): Promise<resto> {
        return this.restoService.findOne(id_resto);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data resto' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: resto })  
    create(@Body() resto: restoDtoInsert): Promise<resto> {
        return this.restoService.create(resto);
    }

    @Put(':id_resto')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data resto' })
    @ApiResponse({ status: 200, description: 'The resto has been successfully updated.', type: resto })
    update(@Param('id_resto') id_resto: number, @Body() resto: restoDtoInsert) {
        return this.restoService.update(id_resto, resto);
    }

    @ApiOperation({ summary: 'Delete data DtoInsert' })
    @ApiResponse({ status: 200, description: 'The DtoInsert has been successfully deleted.' })
    @Delete(':id_resto')
    remove(@Param('id_resto') id: number) {
        return this.restoService.remove(id);
    }
            
}
