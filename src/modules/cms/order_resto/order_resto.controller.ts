import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { Request } from 'express';
import { OrderRestoService } from './order_resto.service';
import { canceledOrder, insertOrderResto, paramGetOrderResto } from './order_resto.dto';

@Controller('order-resto')
@ApiTags('cms-order-resto')
export class OrderRestoController {
    
    constructor(private readonly _OrderRestoService:OrderRestoService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data by periode' })
    @ApiResponse({ status: 200})
    findAll(@Query() query:paramGetOrderResto,@Req() req:Request): Promise<any> {
        return this._OrderRestoService.findAll(query,req);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan OrderRestoEntity by id ' })
    @ApiResponse({ status: 200 })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<any> {
        return this._OrderRestoService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data order' })
    @ApiResponse({ status: 201})  
    create(@Body() OrderRestoEntity: insertOrderResto, @Req() req:Request): Promise<any> {
        return this._OrderRestoService.create(OrderRestoEntity, req);
    }



    @Delete()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Cancel data order' })
    @ApiResponse({ status: 200})
    batal(@Body() body: canceledOrder,@Req() req:Request) {
        return this._OrderRestoService.batal(body,req);
    }

}
