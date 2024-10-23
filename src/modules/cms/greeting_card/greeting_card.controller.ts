import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { greeting_cardDtoInsert } from './greeting_card.dto';
import { GreetingCardService } from './greeting_card.service';
import { Request } from 'express';

@Controller('cms/greetingCard')
@ApiTags('cms-greetingCard')
export class GreetingCardController {
    
    constructor(private readonly greeting_cardService:GreetingCardService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all greeting_card.', type: [greeting_card] })
    findAll(@Req() req:Request): Promise<greeting_card[]> {
        return this.greeting_cardService.findAll(req);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan greeting_card by id greeting_card' })
    @ApiResponse({ status: 200, description: 'Return a single greeting_card.', type: greeting_card })
    @Get(':id_greeting_card')
    findOne(@Param('id_greeting_card') id_greeting_card: number): Promise<greeting_card> {
        return this.greeting_cardService.findOne(id_greeting_card);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tambah data greeting_card' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: greeting_card })  
    create(@Body() greeting_card: greeting_cardDtoInsert,@Req() req:Request): Promise<greeting_card> {
        return this.greeting_cardService.create(greeting_card,req);
    }

    @Put(':id_greeting_card')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data greeting_card' })
    @ApiResponse({ status: 200, description: 'The greeting_card has been successfully updated.', type: greeting_card })
    update(@Param('id_greeting_card') id_greeting_card: number, @Body() greeting_card: greeting_cardDtoInsert) {
        return this.greeting_cardService.update(id_greeting_card, greeting_card);
    }

    @ApiOperation({ summary: 'Delete data DtoInsert' })
    @ApiResponse({ status: 200, description: 'The DtoInsert has been successfully deleted.' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @Delete(':id_greeting_card')
    remove(@Param('id_greeting_card') id: number) {
        return this.greeting_cardService.remove(id);
    }

    @Put('updateStatusActive/:id_channel')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update data tv_channel' })
    @ApiResponse({ status: 200, description: 'The tv_channel has been successfully updated.', type: greeting_card })
    updateStatusActive(@Param('id_channel') id_channel: number) {
        return this.greeting_cardService.updateStatusActive(id_channel);
    }
            
}
