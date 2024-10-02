import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { menu } from 'src/database/iptv/menu.entity';
import { role_menu } from 'src/database/iptv/role_menu.entity';
import { role_menuDtoInsert } from './role_menu.dto';
import { role_menuRepository } from './role_menu.repository';

@Injectable({ scope: Scope.REQUEST })
export class RoleMenuService {
    constructor(
        @InjectModel(role_menu)
        private role_menuModel: typeof role_menu,
        @InjectModel(menu)
        private menuModel: typeof menu,
        private readonly role_menuRepo:role_menuRepository
    ) {}
    
    findAll(): Promise<role_menu[]> {
        try {
            return this.role_menuRepo.GetAll();            
        } catch (error) {
            throw error;
        }
    }

    async GetByIdRole(id_role: number): Promise<any[]> {
        let menu = await this.menuModel.findAll();
        let response:any[] = [];
        for(const detail of menu){
            let is_assign:boolean = false;
            let menu = await this.role_menuModel.findOne({where:{id_menu:detail.id_menu,id_role:id_role}})
            if(menu){
                is_assign =true;
            }
            response.push({
                id_menu: detail.id_menu,
                urut: detail.urut,
                caption: detail.caption,
                icon: detail.icon,
                toggle_child: detail.toggle_child,
                url: detail.url,
                is_parent: detail.is_parent,
                id_parent: detail.id_parent,
                is_active: detail.is_active,
                is_assign :is_assign
              });
        }
        return response;
        // return this.role_menuRepo.GetByIdRole(id_role);
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
            