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
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';
import { HotelService } from './hotel.service';
import { hotelDtoInsert, updateIsStreamHotel } from './hotel.dto';

@Controller('admin/hotel')
@ApiTags('admin-hotel')
export class HotelController {
  constructor(private readonly _hotelService: HotelService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({
    status: 200,
    description: 'Return all iptv_feature.',
    type: [iptv_feature],
  })
  findAll(@Req() req: Request): Promise<iptv_feature[]> {
    return this._hotelService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan iptv_feature by id iptv_feature' })
  @ApiResponse({
    status: 200,
    description: 'Return a single iptv_feature.',
    type: iptv_feature,
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<iptv_feature> {
    return this._hotelService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data hotel' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: iptv_feature,
  })
  create(
    @Body() iptv_feature: hotelDtoInsert,
    @Req() req: Request,
  ): Promise<iptv_feature> {
    return this._hotelService.create(iptv_feature, req);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data hotel' })
  @ApiResponse({
    status: 200,
    description: 'The iptv_feature has been successfully updated.',
    type: iptv_feature,
  })
  update(
    @Param('id') id: number,
    @Body() iptv_feature: hotelDtoInsert,
    @Req() req: Request,
  ) {
    return this._hotelService.update(id, iptv_feature, req);
  }

  @Put('update_is_stream/:id_hotel')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update is_stream data hotel' })
  update_is_stream(
    @Param('id_hotel') id_hotel: string,
    @Body() body: updateIsStreamHotel,
  ) {
    return this._hotelService.updateIsStream(id_hotel, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete data hotel' })
  @ApiResponse({
    status: 200,
    description: 'The iptv_feature has been successfully delete.',
  })
  delete(@Param('id') id: number, @Req() req: Request) {
    return this._hotelService.remove(id);
  }
}
