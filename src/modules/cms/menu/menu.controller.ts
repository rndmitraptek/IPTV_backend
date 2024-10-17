import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/authentication/users/jwt-auth.gruard';
import { MenuService } from './menu.service';

@Controller('cms/menu')
@ApiTags('cms-menu')
export class MenuController {
    constructor(private readonly menuService:MenuService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Menampilkan Semua Data' })
    @ApiResponse({ status: 200, description: 'Return all promo.', type:null })
    getMenu(): Promise<any> {
        return this.menuService.getMenu();
    }
    
}
