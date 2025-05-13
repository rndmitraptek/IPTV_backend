// gateway.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { AdminModule } from 'src/modules/admin/admin.module';
import { AppGateway } from './websocket.helper';
import { UserDeviceMonitoringService } from './userDeviceMonitoring.helper';
import { UserDeviceModule } from './userDeviceMonitoring.module';

@Module({
  imports: [
    // SequelizeModule.forFeature([users_deviceEntity])
    // forwardRef(() => UserDeviceModule)
  ],
  providers: [AppGateway],
  exports: [AppGateway],
})
export class GatewayModule {}
