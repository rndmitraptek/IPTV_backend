import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { role } from 'src/database/iptv/role.entity';
import { users } from 'src/database/iptv/users.entity';
import { loginDto, usersDtoInsert, usersDtoUpdate } from './users.dto';
import { response_login_model } from './users.model';
import { Sequelize } from 'sequelize-typescript';
import { role_menu } from 'src/database/iptv/role_menu.entity';
import { menu } from 'src/database/iptv/menu.entity';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(users)
        private userModel: typeof users,
        @InjectModel(role)
        private roleModel: typeof role,
        @InjectModel(role_menu)
        private _role_menu: typeof role_menu,
        @InjectModel(menu)
        private _menu: typeof menu,
        @InjectModel(iptv_feature)
        private iptv_featureModel: typeof iptv_feature,
        private sequelize:Sequelize
    ) {}
    
    findAll(req:any): Promise<users[]> {
        try {
            return this.userModel.findAll({
                attributes:[
                    'id_user',
                    'nama',
                    'username',
                    'password',
                    'id_role',
                    'is_active',
                    'is_admin',
                    'id_hotel',
                    [this.sequelize.col('role.role'),'nama_role'],
                    [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                ],
                include:[
                    {
                        attributes:[],
                        model:role,
                        as:'role'
                    },
                    {
                        attributes:[],
                        model:iptv_feature,
                        as:'hotel'
                    }
                ],
                where:{id_hotel:req.user.id_hotel}
            });            
        } catch (error) {
            throw error;
        }
    }

    async login(param:loginDto): Promise<response_login_model>{
        try {
            let user = await this.userModel.findOne({
                include:[
                    {
                        attributes:['title_hotel'],
                        model:iptv_feature,
                        as:'hotel'
                    }
                ],
                where: {
                    username:param.username,
                    is_active:true
                },
            });
            if(!user){
                throw ('username tidak di temukan');
            }
            if (!await bcrypt.compare(param.password, user.password)) {
                throw ('password salah');
            }

            let role_user = await this.roleModel.findOne({
                where:{
                    id_role:user.id_role
                }
            })
            console.log(user);

            return {
                nama:user.nama,
                username:user.username,
                role:role_user.role,
                nama_hotel:user.hotel==null?null:user.hotel.title_hotel,
                is_admin:user.is_admin,
                token:this.jwtService.sign({
                    id_user:user.id_user,
                    nama :user.nama,
                    username :user.username,
                    id_role :user.id_role,
                    is_admin :user.is_admin,
                    id_hotel :user.id_hotel
                })
            };
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id: number): Promise<users> {
        return this.userModel.findOne({
            where: {
                id_user:id,
            },
        });
    }
    
    async create(user: usersDtoInsert,req:any): Promise<users> {
        user.password = await bcrypt.hash(user.password, 10);
        user['is_admin']=false;
        user['is_active']=true;
        user['id_hotel']=req.user.id_hotel;
        return this.userModel.create(user);
    }
    
    async update(uuid: number, user: usersDtoUpdate): Promise<void> {
        if(user.password !=''){
            user.password = await bcrypt.hash(user.password, 10);
        }
        await this.userModel.update(user, {
            where: {
                id_user:uuid,
            },
        });
    }
    
    async remove(uuid: number): Promise<void> {
        const user = await this.findOne(uuid);
        await user.destroy();
    }


    async getProfile(req:any):Promise<any>{
        if(req.user.id_role ==undefined){
            throw('Akun anda tidak memiliki role');
        }
        
        let profile =await this.userModel.findOne({where:{id_user:req.user.id_user}});

        let getRoleMenu=[];
        if(req.user.is_admin==true){
            getRoleMenu=await this._role_menu.findAll({
                attributes:[
                    'id_role_menu',
                    'id_role',
                    'id_menu',
                    [this.sequelize.col('menu.urut'),'urut'],
                    [this.sequelize.col('menu.caption'),'caption'],
                    [this.sequelize.col('menu.icon'),'icon'],
                    [this.sequelize.col('menu.toggle_child'),'toggle_child'],
                    [this.sequelize.col('menu.url'),'url'],
                    [this.sequelize.col('menu.is_parent'),'is_parent'],
                    [this.sequelize.col('menu.id_parent'),'id_parent'],
                    [this.sequelize.col('menu.is_active'),'is_active'],
                    [this.sequelize.col('menu.is_admin'),'is_admin'],
                    [this.sequelize.col('menu.is_client'),'is_client'],
                ],
                include:[
                    {
                        attributes:[
                            'id_menu',
                            'urut',
                            'caption',
                            'icon',
                            'toggle_child',
                            'url',
                            'is_parent',
                            'id_parent',
                            'is_active',
                            'is_admin',
                            'is_client'
                        ],
                        model:menu,
                        as:'menu',
                        where:{is_active:true,is_admin:true}
                    }
                ],
                where:{id_role:req.user.id_role},
                order:[this.sequelize.col('menu.urut')]
            });
        } else {
            getRoleMenu=await this._role_menu.findAll({
                attributes:[
                    'id_role_menu',
                    'id_role',
                    'id_menu',
                    [this.sequelize.col('menu.urut'),'urut'],
                    [this.sequelize.col('menu.caption'),'caption'],
                    [this.sequelize.col('menu.icon'),'icon'],
                    [this.sequelize.col('menu.toggle_child'),'toggle_child'],
                    [this.sequelize.col('menu.url'),'url'],
                    [this.sequelize.col('menu.is_parent'),'is_parent'],
                    [this.sequelize.col('menu.id_parent'),'id_parent'],
                    [this.sequelize.col('menu.is_active'),'is_active'],
                    [this.sequelize.col('menu.is_admin'),'is_admin'],
                    [this.sequelize.col('menu.is_client'),'is_client'],
                ],
                include:[
                    {
                        attributes:[
                            'id_menu',
                            'urut',
                            'caption',
                            'icon',
                            'toggle_child',
                            'url',
                            'is_parent',
                            'id_parent',
                            'is_active',
                            'is_admin',
                            'is_client'
                        ],
                        model:menu,
                        as:'menu',
                        where:{is_active:true,is_client:true}
                    }
                ],
                where:{id_role:req.user.id_role},
                order:[this.sequelize.col('menu.urut')]
            });
        }
        

        let result=[];
        let id_parent=0;
        let indexParent=0;
        
        for(let i=0; i<getRoleMenu.length; i++){
            if(getRoleMenu[i].menu.id_parent==null){
                result[indexParent]=getRoleMenu[i];
                result[indexParent].setDataValue('sidebarChild',[]);
                delete result[indexParent].dataValues.menu;
                id_parent=getRoleMenu[i].menu.id_menu;
                console.log(id_parent);
                indexParent+=1;
            } else {
                if(id_parent==getRoleMenu[i].menu.id_parent){
                    delete getRoleMenu[i].dataValues.menu;
                    result[indexParent-1].dataValues.sidebarChild.push(getRoleMenu[i]);
                }
            }
        }

        return {
            ...profile.dataValues,
            menu:result
        };
    }
}
