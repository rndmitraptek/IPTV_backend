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
import { paymentMethodService } from './paymentMethod.service';
import { paymentMethodEntity } from 'src/database/iptv/payment_method.entity';
import {
  insertPaymentMethodModel,
  updatePaymentMethodModel,
} from './paymentMethod.dto';

@Controller('payment-method')
@ApiTags('cms-payment-method')
export class paymentMethodController {
  constructor(private readonly _paymentMethodService: paymentMethodService) {}

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data' })
  @ApiResponse({ status: 200, description: 'Return all paymentMethodEntity.' })
  findAll(@Req() req: Request): Promise<paymentMethodEntity[]> {
    return this._paymentMethodService.findAll(req);
  }

  @Get('getActiveOnly')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Menampilkan Semua Data active only' })
  @ApiResponse({ status: 200, description: 'Return all paymentMethodEntity.' })
  getActiveOnly(@Req() req: Request): Promise<paymentMethodEntity[]> {
    return this._paymentMethodService.findAllActiveOnly(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Menampilkan paymentMethodEntity by id paymentMethodEntity',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a single paymentMethodEntity.',
    type: paymentMethodEntity,
  })
  @Get('getById/:id')
  findOne(@Param('id') id: number): Promise<paymentMethodEntity> {
    return this._paymentMethodService.findOne(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'tambah data paymentMethodEntity' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: paymentMethodEntity,
  })
  create(
    @Body() paymentMethodEntity: insertPaymentMethodModel,
    @Req() req: Request,
  ): Promise<paymentMethodEntity> {
    return this._paymentMethodService.create(paymentMethodEntity, req);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update data paymentMethodEntity' })
  @ApiResponse({
    status: 200,
    description: 'The paymentMethodEntity has been successfully updated.',
    type: paymentMethodEntity,
  })
  update(
    @Param('id') id: number,
    @Body() paymentMethodEntity: updatePaymentMethodModel,
    @Req() req: Request,
  ) {
    return this._paymentMethodService.update(id, paymentMethodEntity, req);
  }

  @Delete('deActived/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'deactived data paymentMethodEntity' })
  @ApiResponse({
    status: 200,
    description: 'The paymentMethodEntity has been successfully updated.',
    type: paymentMethodEntity,
  })
  delete(@Param('id') id: number, @Req() req: Request) {
    return this._paymentMethodService.remove(id, req);
  }
}
