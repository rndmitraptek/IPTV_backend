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

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(users)
        private userModel: typeof users,
        @InjectModel(role)
        private roleModel: typeof role,
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
                where: {
                    username:param.username,
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

            let hote = await this.iptv_featureModel.findOne();    

            return {
                nama:user.nama,
                username:user.username,
                role:role_user.role,
                nama_hotel:hote.title_hotel,
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
        if(user.password){
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
}
