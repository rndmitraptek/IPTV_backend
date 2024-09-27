import { Injectable, Scope } from '@nestjs/common';
import { response_make_crud_model } from './crud.model';
import { crudRepository } from './crud.repository';

@Injectable({ scope: Scope.REQUEST })
export class CrudService {
    constructor(
        private readonly crudRepo:crudRepository
    ){}

    async makeCRUD(tabel_name:string): Promise<response_make_crud_model>{
        try {
            let data = await this.crudRepo.getSchemaByTabel(tabel_name);
            // entity 
            var entity = `import { ApiHideProperty } from '@nestjs/swagger';
            import { Column, DataType, Model, Table } from 'sequelize-typescript';

            @Table({ tableName: '${tabel_name}' })
            export class ${tabel_name} extends Model<${tabel_name}> { 
            
            `;
            var att = `[`;
            var model = `export interface ${tabel_name}_model{
            `
            for(const [index,item] of data.entries()){
                model += `${item.column_name} : ${this.mappingTypeData(item.data_type)[1]};`;
                if(index==0){
                    att +=`'${item.column_name}'`;
                    entity += `@ApiHideProperty()
                    @Column({
                        type: DataType.${this.mappingTypeData(item.data_type)[0]},
                        autoIncrement: true,
                        primaryKey: true,
                    })
                    ${item.column_name} : ${this.mappingTypeData(item.data_type)[1]};
                    
                    `;
                }else{
                    att +=`,'${item.column_name}'`;
                    if(item.column_name=='uuid'){
                        entity +=`@Column({
                            type: DataType.UUID,
                            defaultValue: DataType.UUIDV4
                        })
                        ${item.column_name} : ${this.mappingTypeData(item.data_type)[1]};
                        
                        `;
                    }else{
                        entity +=`@Column({
                            type: DataType.${this.mappingTypeData(item.data_type)[0]},
                            allowNull: false,
                        })
                        ${item.column_name} : ${this.mappingTypeData(item.data_type)[1]};
                        
                        `;
                    }
                    
                }
            }
            entity += `}`;
            att +=`]`
            model += `}
            `
            
            // DTO 
            var dto = `import { IsNotEmpty } from 'class-validator';

            export class ${tabel_name}DtoInsert{
            
            `;
            for(const item of data){
                dto+=` @IsNotEmpty({
                            message:'${item.column_name} tidak boleh kosong'
                        })
                        ${item.column_name} : ${this.mappingTypeData(item.data_type)[1]}
                    
                    `;
            }
            dto+=`}`;
            //===== SERVICE
            var service = `import { Injectable, Scope } from '@nestjs/common';
                            import { InjectModel } from '@nestjs/sequelize';
                            import { ${tabel_name} } from 'src/entity/${tabel_name}.entity';
                            import { ${tabel_name}DtoInsert } from './${tabel_name}.dto';

                            @Injectable({ scope: Scope.REQUEST })
                            export class ${this.capitalizeFirstCharacter(tabel_name)}Service {
                                constructor(
                                    @InjectModel(${tabel_name})
                                    private ${tabel_name}Model: typeof ${tabel_name},
                                ) {}
                                
                                findAll(): Promise<${tabel_name}[]> {
                                    try {
                                        return this.${tabel_name}Model.findAll();            
                                    } catch (error) {
                                        throw error;
                                    }
                                }
                                
                                findOne(uuid: string): Promise<${tabel_name}> {
                                    return this.${tabel_name}Model.findOne({
                                        where: {
                                            uuid:uuid,
                                        },
                                    });
                                }
                                
                                async create(_${tabel_name}: ${tabel_name}DtoInsert): Promise<${tabel_name}> {
                                    return this.${tabel_name}Model.create(_${tabel_name});
                                }
                                
                                async update(uuid: string, _${tabel_name}: ${tabel_name}DtoInsert): Promise<void> {
                                    await this.${tabel_name}Model.update(_${tabel_name}, {
                                        where: {
                                            uuid:uuid,
                                        },
                                    });
                                }
                                
                                async remove(uuid: string): Promise<void> {
                                    const ${tabel_name} = await this.findOne(uuid);
                                    await ${tabel_name}.destroy();
                                }
                            }
            `;
            //======= CONTROLLER 
            var controller = `
                constructor(private readonly ${tabel_name}Service:${this.capitalizeFirstCharacter(tabel_name)}Service){}

                @Get()
                @UseGuards(JwtAuthGuard)
                @ApiBearerAuth('access-token')
                @ApiOperation({ summary: 'Menampilkan Semua Data' })
                @ApiResponse({ status: 200, description: 'Return all ${tabel_name}.', type: [${tabel_name}] })
                findAll(): Promise<${tabel_name}[]> {
                    return this.${tabel_name}Service.findAll();
                }

                @UseGuards(JwtAuthGuard)
                @ApiBearerAuth('access-token')
                @ApiOperation({ summary: 'Menampilkan ${tabel_name} by id ${tabel_name}' })
                @ApiResponse({ status: 200, description: 'Return a single ${tabel_name}.', type: ${tabel_name} })
                @Get(':uuid')
                findOne(@Param('uuid') uuid: string): Promise<${tabel_name}> {
                    return this.${tabel_name}Service.findOne(uuid);
                }

                @Post()
                @UseGuards(JwtAuthGuard)
                @ApiBearerAuth('access-token')
                @ApiOperation({ summary: 'tambah data ${tabel_name}' })
                @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: ${tabel_name} })  
                create(@Body() ${tabel_name}: ${tabel_name}DtoInsert): Promise<${tabel_name}> {
                    return this.${tabel_name}Service.create(${tabel_name});
                }

                @Put(':uuid')
                @UseGuards(JwtAuthGuard)
                @ApiBearerAuth('access-token')
                @ApiOperation({ summary: 'Update data ${tabel_name}' })
                @ApiResponse({ status: 200, description: 'The ${tabel_name} has been successfully updated.', type: ${tabel_name} })
                update(@Param('uuid') uuid: string, @Body() ${tabel_name}: ${tabel_name}DtoInsert) {
                    return this.${tabel_name}Service.update(uuid, ${tabel_name});
                }

                @ApiOperation({ summary: 'Delete data DtoInsert' })
                @ApiResponse({ status: 200, description: 'The DtoInsert has been successfully deleted.' })
                @Delete(':uuid')
                remove(@Param('uuid') id: string) {
                    return this.${tabel_name}Service.remove(id);
                }
            `

            var repo = `
            import { Injectable, Scope } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";

@Injectable({ scope: Scope.REQUEST})
export class ${tabel_name}Repository {
    constructor(
        private sequelize: Sequelize
    ) { }

}
            `;
            return {
                entity:entity,
                controller:controller,
                service:service,
                dto:dto,
                repository:repo,
                att:att,
                model:model
            };
        } catch (error) {
            throw error;
        }
    }

    mappingTypeData(type:string):[string,string]{
        switch (type) {
            case 'integer':
                return ['INTEGER','number'];
                break;
            case 'text':
                return ['TEXT','string'];
                break;
            case 'character varying':
                return ['STRING','string'];
                break;
            case 'bigint':
                return ['BIGINT','string'];
                break;
            case 'smallint':
                return ['SMALLINT','number'];
                break;
            case 'numeric':
                return ['DECIMAL','number'];
                break;
            default:
                return ['STRING','string'];
                break;
        }
    }

    capitalizeFirstCharacter(str) {
        if (!str) return str; // Check if the string is empty or null
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

}
