import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { tv_group } from 'src/database/iptv/tv_group.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { tv_groupDtoInsert, tv_groupDtoUpdate } from './tv_group.dto';
import { TvGroupService } from './tv_group.service';

@Controller('cms/tvGroup')
@ApiTags('cms-tvGroup')
export class TvGroupController {
    
    constructor(private readonly tv_groupService:TvGroupService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all tv_group.', type: [tv_group] })
    findAll(): Promise<tv_group[]> {
        return this.tv_groupService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan tv_group by id tv_group' })
    @ApiResponse({ status: 200, description: 'Return a single tv_group.', type: tv_group })
    @Get(':id_group')
    findOne(@Param('id_group') id_group: number): Promise<tv_group> {
        return this.tv_groupService.findOne(id_group);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data tv_group' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: tv_group })  
    create(@Body() tv_group: tv_groupDtoInsert): Promise<tv_group> {
        return this.tv_groupService.create(tv_group);
    }

    @Put(':id_group')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data tv_group' })
    @ApiResponse({ status: 200, description: 'The tv_group has been successfully updated.', type: tv_group })
    update(@Param('id_group') id_group: number, @Body() tv_group: tv_groupDtoUpdate) {
        return this.tv_groupService.update(id_group, tv_group);
    }

    @ApiOperation({ summary: 'Delete data DtoInsert' })
    @ApiResponse({ status: 200, description: 'The DtoInsert has been successfully deleted.' })
    @Delete(':id_group')
    remove(@Param('id_group') id_group: number) {
        return this.tv_groupService.remove(id_group);
    }
            
}
