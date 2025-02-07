import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';
import { TvChannelAdminService } from './tv_channel_admin.service';
import {
  tv_channelAdminDtoInsert,
  tv_channelAdminDtoUpdateUrut,
  tv_channelAdminDtoUpdateUrutRequest,
} from './tv_channel_admin.dto';

@Controller('admin/tvChannelAdmin')
@ApiTags('admin-tvChannel')
export class TvChannelAdminController {
  constructor(
    private readonly _tv_channelAdminService: TvChannelAdminService,
  ) {}

  @Get(':id_hotel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({
    status: 200,
    description: 'Return all tv_channel.',
    type: [tv_channel],
  })
  findAll(@Param('id_hotel') id_hotel: number): Promise<tv_channel[]> {
    return this._tv_channelAdminService.findAll(id_hotel);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan tv_channel by id tv_channel' })
  @ApiResponse({
    status: 200,
    description: 'Return a single tv_channel.',
    type: tv_channel,
  })
  @Get('byIdGroup/:id_group/:id_hotel')
  findOne(
    @Param('id_group') id_group: number,
    @Param('id_hotel') id_hotel: number,
    @Req() req: Request,
  ): Promise<tv_channel> {
    return this._tv_channelAdminService.findOne(id_group, id_hotel);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data tv_channel' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: tv_channel,
  })
  create(
    @Body() tv_channel: tv_channelAdminDtoInsert,
    @Req() req: Request,
  ): Promise<tv_channel> {
    return this._tv_channelAdminService.create(tv_channel);
  }

  @Put(':id_channel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data tv_channel' })
  @ApiResponse({
    status: 200,
    description: 'The tv_channel has been successfully updated.',
    type: tv_channel,
  })
  update(
    @Param('id_channel') id_channel: string,
    @Body() tv_channel: tv_channelAdminDtoInsert,
  ) {
    return this._tv_channelAdminService.update(id_channel, tv_channel);
  }

  @ApiOperation({ summary: 'Delete data DtoInsert' })
  @ApiResponse({
    status: 200,
    description: 'The DtoInsert has been successfully deleted.',
  })
  @Delete(':id_channel')
  remove(@Param('id_channel') id: number) {
    return this._tv_channelAdminService.remove(id);
  }

  @Put('updateStatusActive/:id_channel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data tv_channel' })
  @ApiResponse({
    status: 200,
    description: 'The tv_channel has been successfully updated.',
    type: tv_channel,
  })
  updateStatusActive(@Param('id_channel') id_channel: number) {
    return this._tv_channelAdminService.updateStatusActive(id_channel);
  }

  @Put('updateStatusAssign/:id_channel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data tv_channel' })
  @ApiResponse({
    status: 200,
    description: 'The tv_channel has been successfully updated.',
    type: tv_channel,
  })
  updateStatusAssign(@Param('id_channel') id_channel: number) {
    return this._tv_channelAdminService.updateStatusAssign(id_channel);
  }

  @Post('updateUrut')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data tv_channel' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: tv_channelAdminDtoUpdateUrut,
  })
  updateUrut(
    @Body() tv_channel: tv_channelAdminDtoUpdateUrutRequest,
  ): Promise<tv_channelAdminDtoUpdateUrut[]> {
    return this._tv_channelAdminService.updateUrutan(tv_channel.data);
  }
}
