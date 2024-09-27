import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { users } from 'src/database/iptv/users.entity';
import { loginDto, usersDtoInsert } from './users.dto';
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
                email:user.email,
                token:this.jwtService.sign({
                    id_user:user.id_user
                })
            };
        } catch (error) {
            throw error;
        }
    }
    
    findOne(uuid: string): Promise<users> {
        return this.userModel.findOne({
            where: {
                uuid:uuid,
            },
        });
    }
    
    async create(user: usersDtoInsert): Promise<users> {
        user.password = await bcrypt.hash(user.password, 10);
        return this.userModel.create(user);
    }
    
    async update(uuid: string, user: users): Promise<void> {
        await this.userModel.update(user, {
            where: {
                uuid:uuid,
            },
        });
    }
    
    async remove(uuid: string): Promise<void> {
        const user = await this.findOne(uuid);
        await user.destroy();
    }
}
