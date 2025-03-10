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
import { resto } from 'src/database/iptv/resto.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { restoDtoInsert } from './resto.dto';
import { RestoService } from './resto.service';
import { Request } from 'express';

@Controller('cms/resto')
@ApiTags('cms-resto')
export class RestoController {
  constructor(private readonly restoService: RestoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({ status: 200, description: 'Return all resto.', type: [resto] })
  findAll(@Req() req: Request): Promise<resto[]> {
    return this.restoService.findAll(req);
  }

  @Get('getByGroup/:id_group')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data by id_group' })
  @ApiResponse({ status: 200, description: 'Return all resto.', type: [resto] })
  getByGroup(
    @Param('id_group') id_group: number,
    @Req() req: Request,
  ): Promise<resto[]> {
    return this.restoService.getByGroup(id_group, req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan resto by id resto' })
  @ApiResponse({
    status: 200,
    description: 'Return a single resto.',
    type: resto,
  })
  @Get(':id_resto')
  findOne(@Param('id_resto') id_resto: number): Promise<resto> {
    return this.restoService.findOne(id_resto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data resto' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: resto,
  })
  create(@Body() resto: restoDtoInsert, @Req() req: Request): Promise<resto> {
    return this.restoService.create(resto, req);
  }

  @Put(':id_resto')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data resto' })
  @ApiResponse({
    status: 200,
    description: 'The resto has been successfully updated.',
    type: resto,
  })
  update(
    @Param('id_resto') id_resto: number,
    @Body() resto: restoDtoInsert,
    @Req() req: Request,
  ) {
    return this.restoService.update(id_resto, resto, req);
  }

  @ApiOperation({ summary: 'Delete data DtoInsert' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'The DtoInsert has been successfully deleted.',
  })
  @Delete(':id_resto')
  remove(@Param('id_resto') id: number, @Req() req: Request) {
    // console.log('req :', req);
    return this.restoService.remove(id, req);
  }
}
