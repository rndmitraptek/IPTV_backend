import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';
import { RestoGroupService } from './resto-group.service';
import { restoGroupEntity } from 'src/database/iptv/resto_group.entity';
import { insertRestoGroup } from './resto-group.dto';

@Controller('resto-group')
@ApiTags('cms-resto-group')
export class RestoGroupController {
    
    constructor(private readonly _RestoGroupService:RestoGroupService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all restoGroupEntity.' })
    findAll(@Req() req:Request): Promise<restoGroupEntity[]> {
        return this._RestoGroupService.findAll(req);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan restoGroupEntity by id restoGroupEntity' })
    @ApiResponse({ status: 200, description: 'Return a single restoGroupEntity.', type: restoGroupEntity })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<restoGroupEntity> {
        return this._RestoGroupService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data restoGroupEntity' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: restoGroupEntity })  
    create(@Body() restoGroupEntity: insertRestoGroup, @Req() req:Request): Promise<restoGroupEntity> {
        return this._RestoGroupService.create(restoGroupEntity, req);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data restoGroupEntity' })
    @ApiResponse({ status: 200, description: 'The restoGroupEntity has been successfully updated.', type: restoGroupEntity })
    update(@Param('id') id: number, @Body() restoGroupEntity: insertRestoGroup,@Req() req:Request) {
        return this._RestoGroupService.update(id, restoGroupEntity,req);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Remove data restoGroupEntity' })
    @ApiResponse({ status: 200, description: 'The restoGroupEntity has been successfully updated.', type: restoGroupEntity })
    delete(@Param('id') id: number,@Req() req:Request) {
        return this._RestoGroupService.remove(id,req);
    }

}
