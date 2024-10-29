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
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class AppGateway {
    @WebSocketServer()
    server: Server;
    logger:Logger=new Logger('AppGateway');
  
    // handleConnection(client: Socket) {
    //     console.log('handle connection WS');
    //     console.log(client);
    //     const id_hotel = client.handshake.query.id_hotel;
    //     client.join(id_hotel); // Tambahkan klien ke room berdasarkan id_hotel
    //     console.log(`Client ${client.id} connected to tenant ${id_hotel}`);
    // }
  
    // handleDisconnect(client: Socket) {
    //   console.log('Client disconnected:', client.id);
    // }
  
    @SubscribeMessage('message')
    handleMessage(@MessageBody() body:any): void {
      this.logger.log('send message websocket');
      this.logger.log(body);
      // Kirim pesan ke semua klien di room id_hotel
      this.server.emit('message', body);
    }
  
    // sendToSpecificClient(clientId: string, message: string) {
    //   this.server.to(clientId).emit('message', message); // Kirim pesan ke klien tertentu
    // }
  }
  