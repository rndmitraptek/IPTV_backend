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
import { userGuestService } from './userGuest.service';
import { userGuestInsert, userGuestMulti } from './userGuest.dto';
import { users_guestEntity } from 'src/database/iptv/users_guest.entity';

@Controller('cms/user-guest')
@ApiTags('cms-userGuest')
export class userGuestController {
  constructor(private readonly _userGuestService: userGuestService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data guest' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  create(
    @Body() role: userGuestInsert,
    @Req() req: Request,
  ): Promise<users_guestEntity> {
    return this._userGuestService.create(role, req);
  }

  @Post('createMulti')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data guest multi' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  createMulti(@Body() role: userGuestMulti, @Req() req: Request) {
    return this._userGuestService.createMulti(role, req);
  }

  @ApiOperation({ summary: 'Delete data guest' })
  @ApiResponse({
    status: 200,
  })
  @Delete(':id_user_guest')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  remove(@Param('id_user_guest') id_user_guest: number, @Req() req: Request) {
    return this._userGuestService.remove(id_user_guest, req);
  }
}
