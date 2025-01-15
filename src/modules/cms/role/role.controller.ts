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
import { role } from 'src/database/iptv/role.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { roleDtoInsert } from './role.dto';
import { RoleService } from './role.service';
import { Request } from 'express';

@Controller('cms/role')
@ApiTags('cms-role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({ status: 200, description: 'Return all role.', type: [role] })
  findAll(@Req() req: Request): Promise<role[]> {
    return this.roleService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan role by id_role role' })
  @ApiResponse({
    status: 200,
    description: 'Return a single role.',
    type: role,
  })
  @Get(':id_role')
  findOne(@Param('id_role') id_role: number): Promise<role> {
    return this.roleService.findOne(id_role);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data role' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: role,
  })
  create(@Body() role: roleDtoInsert, @Req() req: Request): Promise<role> {
    return this.roleService.create(role, req);
  }

  @Put(':id_role')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data role' })
  @ApiResponse({
    status: 200,
    description: 'The role has been successfully updated.',
    type: role,
  })
  update(@Param('id_role') id_role: number, @Body() role: roleDtoInsert) {
    return this.roleService.update(id_role, role);
  }

  @ApiOperation({ summary: 'Delete data DtoInsert' })
  @ApiResponse({
    status: 200,
    description: 'The DtoInsert has been successfully deleted.',
  })
  @Delete(':id_role')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  remove(@Param('id_role') id_role: number) {
    return this.roleService.remove(id_role);
  }
}
