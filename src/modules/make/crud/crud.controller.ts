import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { response_make_crud_model } from './crud.model';
import { CrudService } from './crud.service';

@Controller('make/crud')
@ApiTags('Make')
export class CrudController {
    constructor(private readonly crudService:CrudService){}
    
    // @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'tools' })
    @Get(':tabel_name')
    generade(@Param('tabel_name') tabel_name: string): Promise<response_make_crud_model> {
        return this.crudService.makeCRUD(tabel_name);
    }
}
