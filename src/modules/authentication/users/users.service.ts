import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { users } from 'src/database/iptv/users.entity';
import { loginDto, usersDtoInsert, usersDtoUpdate } from './users.dto';
import { response_login_model } from './users.model';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(users)
        private userModel: typeof users,
    ) {}
    
    findAll(): Promise<users[]> {
        try {
            return this.userModel.findAll();            
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
            return {
                nama:user.nama,
                username:user.username,
                token:this.jwtService.sign({
                    id_user:user.id_user
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
    
    async create(user: usersDtoInsert): Promise<users> {
        user.password = await bcrypt.hash(user.password, 10);
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
