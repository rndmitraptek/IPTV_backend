import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { role_menu } from 'src/database/iptv/role_menu.entity';
import { role_menuDtoInsert } from './role_menu.dto';
import { role_menuRepository } from './role_menu.repository';

@Injectable({ scope: Scope.REQUEST })
export class RoleMenuService {
    constructor(
        @InjectModel(role_menu)
        private role_menuModel: typeof role_menu,
        private readonly role_menuRepo:role_menuRepository
    ) {}
    
    findAll(): Promise<role_menu[]> {
        try {
            return this.role_menuRepo.GetAll();            
        } catch (error) {
            throw error;
        }
    }

    GetByIdRole(id_role: number): Promise<role_menu[]> {
        return this.role_menuRepo.GetByIdRole(id_role);
    }
    
    findOne(id: number): Promise<role_menu> {
        return this.role_menuModel.findOne({
            where: {
                id_role_menu:id,
            },
        });
    }
    
    async create(_role_menu: role_menuDtoInsert): Promise<role_menu> {
        return this.role_menuModel.create(_role_menu);
    }
    
    async update(id: number, _role_menu: role_menuDtoInsert): Promise<void> {
        await this.role_menuModel.update(_role_menu, {
            where: {
                id_role_menu:id,
            },
        });
    }
    
    async remove(id: number): Promise<void> {
        const role_menu = await this.findOne(id);
        await role_menu.destroy();
    }
}
            