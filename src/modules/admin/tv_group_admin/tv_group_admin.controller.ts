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
import { tv_group } from 'src/database/iptv/tv_group.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';
import { TvGroupAdminService } from './tv_group_admin.service';
import {
  tv_groupAdminDtoInsert,
  tv_groupAdminDtoUpdate,
} from './tv_group_admin.dto';

@Controller('admin/tvGroup')
@ApiTags('admin-tvGroup')
export class TvGroupAdminController {
  constructor(private readonly _TvGroupAdminService: TvGroupAdminService) {}

  @Get(':id_hotel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({
    status: 200,
    description: 'Return all tv_group.',
    type: [tv_group],
  })
  findAll(@Param('id_hotel') id_hotel: number): Promise<tv_group[]> {
    return this._TvGroupAdminService.findAll(id_hotel);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan tv_group by id tv_group' })
  @ApiResponse({
    status: 200,
    description: 'Return a single tv_group.',
    type: tv_group,
  })
  @Get(':id_group')
  findOne(
    @Param('id_group') id_group: number,
    @Param('id_hotel') id_hotel: number,
  ): Promise<tv_group> {
    return this._TvGroupAdminService.findOne(id_group, id_hotel);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data tv_group' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: tv_group,
  })
  create(@Body() tv_group: tv_groupAdminDtoInsert): Promise<tv_group> {
    return this._TvGroupAdminService.create(tv_group);
  }

  @Put(':id_group')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data tv_group' })
  @ApiResponse({
    status: 200,
    description: 'The tv_group has been successfully updated.',
    type: tv_group,
  })
  update(
    @Param('id_group') id_group: number,
    @Body() tv_group: tv_groupAdminDtoUpdate,
  ) {
    return this._TvGroupAdminService.update(id_group, tv_group);
  }

  @ApiOperation({ summary: 'Delete data DtoInsert' })
  @ApiResponse({
    status: 200,
    description: 'The DtoInsert has been successfully deleted.',
  })
  @Delete(':id_group')
  remove(@Param('id_group') id_group: number) {
    return this._TvGroupAdminService.remove(id_group);
  }
}
