import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { iptv_featureDtoInsert } from './iptv_feature.dto';
import { IptvFeatureService } from './iptv_feature.service';

@Controller('iptv-feature')
@ApiTags('cms/iptvFeature')
export class IptvFeatureController {
    
    constructor(private readonly iptv_featureService:IptvFeatureService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all iptv_feature.', type: [iptv_feature] })
    findAll(): Promise<iptv_feature> {
        return this.iptv_featureService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan iptv_feature by id iptv_feature' })
    @ApiResponse({ status: 200, description: 'Return a single iptv_feature.', type: iptv_feature })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<iptv_feature> {
        return this.iptv_featureService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data iptv_feature' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: iptv_feature })  
    create(@Body() iptv_feature: iptv_featureDtoInsert): Promise<iptv_feature> {
        return this.iptv_featureService.create(iptv_feature);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data iptv_feature' })
    @ApiResponse({ status: 200, description: 'The iptv_feature has been successfully updated.', type: iptv_feature })
    update(@Param('id') id: number, @Body() iptv_feature: iptv_featureDtoInsert) {
        return this.iptv_featureService.update(id, iptv_feature);
    }

}
