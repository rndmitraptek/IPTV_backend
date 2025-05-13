import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { log_connectionEntity } from "src/database/iptv/log_connection.entity";
import { users_deviceEntity } from "src/database/iptv/users_device.entity";

@Injectable()
export class UserDeviceMonitoringService {
  constructor(
    @InjectModel(users_deviceEntity)
    private _users_deviceEntity: typeof users_deviceEntity,
    @InjectModel(log_connectionEntity)
    private _log_connectionEntity: typeof log_connectionEntity,
    private sequelize: Sequelize
  ) {}

  @OnEvent('device.connected')
  async handleDeviceConnected(deviceId: string) {
    console.log('➡️ Update device as online:', deviceId);
    if(deviceId !='unknown'){
        const [count, rows]=await this._users_deviceEntity.update(
            {
                status_connection:'CONNECTED',
                last_connected:this.sequelize.literal(
                    `(select NOW()::TIMESTAMPTZ AT TIME ZONE 'Asia/Bangkok')`
                )
            },
            {
                where:{username:deviceId},
                returning:true
            }
        );
        await this.insertLog(rows[0].dataValues.id_user_device, 'CONNECTED');
    }
  }


  @OnEvent('device.disconnected')
  async handleDeviceDisConnected(deviceId: string) {
    console.log('➡️ Update device as ofline:', deviceId);
    if(deviceId!='unknown'){
        const [count, rows]=await this._users_deviceEntity.update(
            {
                status_connection:'DISCONNECTED',
                last_disconnected:this.sequelize.literal(
                    `(select NOW()::TIMESTAMPTZ AT TIME ZONE 'Asia/Bangkok')`
                )
            },
            {
                where:{username:deviceId},
                returning:true
            }
        );
        await this.insertLog(rows[0].dataValues.id_user_device, 'DISCONNECTED');
    }
  }

  async insertLog(id_user_device:number,status){
    await this._log_connectionEntity.create(
        {
            id_user_device:id_user_device,
            status_connection:status
        },
        {
            fields:[
                'id_user_device',
                'status_connection'
            ]
        }
    )
  }
}