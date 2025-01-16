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
import { info_room } from 'src/database/iptv/info_room.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { info_roomDtoInsert } from './info_room.dto';
import { InfoRoomService } from './info_room.service';
import { Request } from 'express';

@Controller('cms/guest/infoRoom')
@ApiTags('cms-guest/infoRoom')
export class InfoRoomController {
  constructor(private readonly info_roomService: InfoRoomService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({
    status: 200,
    description: 'Return all info_room.',
    type: [info_room],
  })
  findAll(@Req() req: Request): Promise<info_room[]> {
    return this.info_roomService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan info_room by id info_room' })
  @ApiResponse({
    status: 200,
    description: 'Return a single info_room.',
    type: info_room,
  })
  @Get(':id_info_room')
  findOne(@Param('id_info_room') id_info_room: number): Promise<info_room> {
    return this.info_roomService.findOne(id_info_room);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data info_room' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: info_room,
  })
  create(
    @Body() info_room: info_roomDtoInsert,
    @Req() req: Request,
  ): Promise<info_room> {
    return this.info_roomService.create(info_room, req);
  }

  @Put(':id_info_room')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data info_room' })
  @ApiResponse({
    status: 200,
    description: 'The info_room has been successfully updated.',
    type: info_room,
  })
  update(
    @Param('id_info_room') id_info_room: string,
    @Body() info_room: info_roomDtoInsert,
    @Req() req: Request,
  ) {
    return this.info_roomService.update(id_info_room, info_room, req);
  }

  @ApiOperation({ summary: 'Delete data DtoInsert' })
  @ApiResponse({
    status: 200,
    description: 'The DtoInsert has been successfully deleted.',
  })
  @Delete(':id_info_room')
  remove(@Param('id_info_room') id: number, @Req() req: Request) {
    return this.info_roomService.remove(id, req);
  }
}
