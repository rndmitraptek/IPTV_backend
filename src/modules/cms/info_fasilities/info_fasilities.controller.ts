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
import { info_fasilities } from 'src/database/iptv/info_fasilities.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { info_fasilitiesDtoInsert } from './info_fasilities.dto';
import { InfoFasilitiesService } from './info_fasilities.service';
import { Request } from 'express';

@Controller('cms/guest/infoFasilities')
@ApiTags('cms-guest/infoFasilities')
export class InfoFasilitiesController {
  constructor(private readonly info_fasilitiesService: InfoFasilitiesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({
    status: 200,
    description: 'Return all info_fasilities.',
    type: [info_fasilities],
  })
  findAll(@Req() req: Request): Promise<info_fasilities[]> {
    return this.info_fasilitiesService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Menampilkan info_fasilities by id info_fasilities',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a single info_fasilities.',
    type: info_fasilities,
  })
  @Get(':id_info_fasilites')
  findOne(
    @Param('id_info_fasilites') id_info_fasilites: string,
  ): Promise<info_fasilities> {
    return this.info_fasilitiesService.findOne(id_info_fasilites);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data info_fasilities' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: info_fasilities,
  })
  create(
    @Body() info_fasilities: info_fasilitiesDtoInsert,
    @Req() req: Request,
  ): Promise<info_fasilities> {
    return this.info_fasilitiesService.create(info_fasilities, req);
  }

  @Put(':id_info_fasilites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data info_fasilities' })
  @ApiResponse({
    status: 200,
    description: 'The info_fasilities has been successfully updated.',
    type: info_fasilities,
  })
  update(
    @Param('id_info_fasilites') id_info_fasilites: string,
    @Body() info_fasilities: info_fasilitiesDtoInsert,
    @Req() req: Request,
  ) {
    return this.info_fasilitiesService.update(
      id_info_fasilites,
      info_fasilities,
      req,
    );
  }

  @ApiOperation({ summary: 'Delete data DtoInsert' })
  @ApiResponse({
    status: 200,
    description: 'The DtoInsert has been successfully deleted.',
  })
  @Delete(':id_info_fasilites')
  remove(@Param('id_info_fasilites') id: string, @Req() req: Request) {
    return this.info_fasilitiesService.remove(id, req);
  }
}
