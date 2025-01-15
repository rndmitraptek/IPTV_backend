import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';
import { BackgroundService } from './background.service';
import { insertBackground } from './background.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/utility/minio-client.model';

@Controller('cms/background')
@ApiTags('cms-background')
export class BackgroundController {
  constructor(private readonly _backgroundService: BackgroundService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({ status: 200 })
  findAll(@Req() req: Request): Promise<any> {
    return this._backgroundService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan by id' })
  @ApiResponse({ status: 200 })
  @Get(':id_background')
  findOne(@Param('id_background') id_background: number): Promise<any> {
    return this._backgroundService.findOne(id_background);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data body' })
  @ApiResponse({ status: 201 })
  create(@Body() body: insertBackground, @Req() req: Request): Promise<any> {
    return this._backgroundService.create(body, req);
  }

  @Put(':id_background')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data body' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id_background') id_background: number,
    @Body() body: insertBackground,
    @Req() req: Request,
  ) {
    return this._backgroundService.update(id_background, body, req);
  }

  @Put('updateStatus/:id_background')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update status data' })
  @ApiResponse({ status: 200 })
  updateStatusActive(
    @Param('id_background') id_background: number,
    @Req() req: Request,
  ) {
    return this._backgroundService.updateStatusActive(id_background, req);
  }
}
