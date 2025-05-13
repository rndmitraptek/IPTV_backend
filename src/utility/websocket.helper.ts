import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserDeviceMonitoringService } from './userDeviceMonitoring.helper';
import { EventEmitter2 } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer()
  server: Server;
  logger: Logger = new Logger('AppGateway');
  constructor(private eventEmitter: EventEmitter2) {}

  handleConnection(client: Socket) {
    const deviceId = client.handshake.query.device_id as string;
    console.log(`Device connected: ${deviceId}`);
    // this._UserDeviceMonitoringService.setOnline(deviceId);
    this.eventEmitter.emit('device.connected', deviceId);
  }

  handleDisconnect(client: Socket) {
    const deviceId = client.handshake.query.device_id;
    console.log(`Device disconnected: ${deviceId}`);
    this.eventEmitter.emit('device.disconnected', deviceId);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: any): void {
    this.logger.log('send message websocket');
    this.logger.log(body);
    // Kirim pesan ke semua klien di room id_hotel
    this.server.emit('message', body);
  }

  @SubscribeMessage('status_order')
  handleMessageStatusOrder(@MessageBody() body: any): void {
    this.logger.log('send message websocket status order');
    this.logger.log(body);
    // Kirim pesan ke semua klien di room id_hotel
    this.server.emit('status_order', body);
  }

  @SubscribeMessage('status_bayar')
  handleMessageStatusBayarCallback(@MessageBody() body: any): void {
    this.logger.log('send message websocket status bayar callback');
    this.logger.log(body);
    // Kirim pesan ke semua klien di room id_hotel
    this.server.emit('status_bayar', body);
  }

  @SubscribeMessage('update_data')
  handleMessageUpdateData(@MessageBody() body: any): void {
    this.logger.log('send message websocket update data');
    // this.logger.log(body);
    // Kirim pesan ke semua klien di room id_hotel
    this.server.emit('update_data', body);
  }

  // sendToSpecificClient(clientId: string, message: string) {
  //   this.server.to(clientId).emit('message', message); // Kirim pesan ke klien tertentu
  // }

}
