import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { tv_channelDtoInsert, tv_channelDtoUpdateUrut, tv_channelDtoUpdateUrutRequest } from './tv_channel.dto';
import { TvChannelService } from './tv_channel.service';

@Controller('cms/tvChannel')
@ApiTags('cms-tvChannel')
export class TvChannelController {
    constructor(private readonly tv_channelService:TvChannelService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all tv_channel.', type: [tv_channel] })
    findAll(): Promise<tv_channel[]> {
        return this.tv_channelService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan tv_channel by id tv_channel' })
    @ApiResponse({ status: 200, description: 'Return a single tv_channel.', type: tv_channel })
    @Get('byIdGroup/:id_group')
    findOne(@Param('id_group') id_group: number): Promise<tv_channel> {
        return this.tv_channelService.findOne(id_group);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data tv_channel' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: tv_channel })  
    create(@Body() tv_channel: tv_channelDtoInsert): Promise<tv_channel> {
        return this.tv_channelService.create(tv_channel);
    }

    @Put(':id_channel')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data tv_channel' })
    @ApiResponse({ status: 200, description: 'The tv_channel has been successfully updated.', type: tv_channel })
    update(@Param('id_channel') id_channel: string, @Body() tv_channel: tv_channelDtoInsert) {
        return this.tv_channelService.update(id_channel, tv_channel);
    }

    @ApiOperation({ summary: 'Delete data DtoInsert' })
    @ApiResponse({ status: 200, description: 'The DtoInsert has been successfully deleted.' })
    @Delete(':id_channel')
    remove(@Param('id_channel') id: number) {
        return this.tv_channelService.remove(id);
    }

    @Put('updateStatusActive/:id_channel')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data tv_channel' })
    @ApiResponse({ status: 200, description: 'The tv_channel has been successfully updated.', type: tv_channel })
    updateStatusActive(@Param('id_channel') id_channel: number) {
        return this.tv_channelService.updateStatusActive(id_channel);
    }

    @Put('updateStatusAssign/:id_channel')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data tv_channel' })
    @ApiResponse({ status: 200, description: 'The tv_channel has been successfully updated.', type: tv_channel })
    updateStatusAssign(@Param('id_channel') id_channel: number) {
        return this.tv_channelService.updateStatusAssign(id_channel);
    }

    @Post('updateUrut')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data tv_channel' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: tv_channelDtoUpdateUrut })  
    updateUrut(@Body() tv_channel: tv_channelDtoUpdateUrutRequest): Promise<tv_channelDtoUpdateUrut[]> {
        return this.tv_channelService.updateUrutan(tv_channel.data);
    }
            
}
