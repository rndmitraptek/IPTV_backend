import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { role } from 'src/database/iptv/role.entity';
import { roleDtoInsert } from './role.dto';

@Injectable({ scope: Scope.REQUEST })
export class RoleService {
    constructor(
        @InjectModel(role)
        private roleModel: typeof role,
    ) {}
    
    findAll(): Promise<role[]> {
        try {
            return this.roleModel.findAll();            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id: number): Promise<role> {
        return this.roleModel.findOne({
            where: {
                id_role:id,
            },
        });
    }
    
    async create(_role: roleDtoInsert): Promise<role> {
        return this.roleModel.create(_role);
    }
    
    async update(id: number, _role: roleDtoInsert): Promise<void> {
        await this.roleModel.update(_role, {
            where: {
                id_role:id,
            },
        });
    }
    
    async remove(id: number): Promise<void> {
        const role = await this.findOne(id);
        await role.destroy();
    }
}