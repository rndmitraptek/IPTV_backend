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
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';
import { warningService } from './warning.service';
import { warningEntity } from 'src/database/iptv/warning.entity';
import { insertWarning, updateWarning } from './warning.dto';

@Controller('cms/warning')
@ApiTags('cms-warning')
export class warningController {
  constructor(private readonly _warningService: warningService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({ status: 200 })
  findAll(@Req() req: Request): Promise<warningEntity[]> {
    return this._warningService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan warning by id' })
  @ApiResponse({
    status: 200,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<warningEntity> {
    return this._warningService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data warning' })
  @ApiResponse({
    status: 201,
  })
  create(
    @Body() body: insertWarning,
    @Req() req: Request,
  ): Promise<warningEntity> {
    return this._warningService.create(body, req);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data warning' })
  @ApiResponse({
    status: 200,
  })
  update(
    @Param('id') id: string,
    @Body() body: updateWarning,
    @Req() req: Request,
  ) {
    return this._warningService.update(id, body, req);
  }
}
