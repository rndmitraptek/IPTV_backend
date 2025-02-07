import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { entertainment } from 'src/database/iptv/entertainment.entity';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { info_fasilities } from 'src/database/iptv/info_fasilities.entity';
import { info_hotel } from 'src/database/iptv/info_hotel.entity';
import { info_room } from 'src/database/iptv/info_room.entity';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { nearby_attraction } from 'src/database/iptv/nearby_attraction.entity';
import { promo } from 'src/database/iptv/promo.entity';
import { resto } from 'src/database/iptv/resto.entity';
import { tv_channelRepository } from './api.repository';
import { Sequelize } from 'sequelize-typescript';
import { restoGroupEntity } from 'src/database/iptv/resto_group.entity';
import { fn, Op, QueryTypes } from 'sequelize';
import { backgroundEntity } from 'src/database/iptv/background.entity';
import { announcementEntity } from 'src/database/iptv/announcement.entity';
import axios, { AxiosRequestConfig, Method } from 'axios';
import * as bcrypt from 'bcrypt';
import { announcementUserEntity } from 'src/database/iptv/announcement_user.entity';
import { backgroundUserEntity } from 'src/database/iptv/background_user.entity';
import { greeting_cardUserEntity } from 'src/database/iptv/greeting_card_user.entity';
import { users_guestEntity } from 'src/database/iptv/users_guest.entity';
import { AppGateway } from 'src/utility/websocket.helper';

@Injectable()
export class ApkService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(iptv_feature)
    private iptv_featureModel: typeof iptv_feature,
    @InjectModel(nearby_attraction)
    private nearby_attractionModel: typeof nearby_attraction,
    @InjectModel(promo)
    private promoModel: typeof promo,
    @InjectModel(resto)
    private restoModel: typeof resto,
    @InjectModel(greeting_card)
    private greeting_cardModel: typeof greeting_card,
    @InjectModel(greeting_cardUserEntity)
    private _greeting_cardUserEntity: typeof greeting_cardUserEntity,
    @InjectModel(backgroundEntity)
    private _backgroundEntity: typeof backgroundEntity,
    @InjectModel(backgroundUserEntity)
    private _backgroundUserEntity: typeof backgroundUserEntity,
    @InjectModel(announcementEntity)
    private _announcementEntity: typeof announcementEntity,
    @InjectModel(announcementUserEntity)
    private _announcementUserEntity: typeof announcementUserEntity,
    @InjectModel(info_hotel)
    private info_hotelModel: typeof info_hotel,
    @InjectModel(info_room)
    private info_roomModel: typeof info_room,
    @InjectModel(info_fasilities)
    private info_fasilitiesModel: typeof info_fasilities,
    @InjectModel(entertainment)
    private entertainmentModel: typeof entertainment,
    @InjectModel(users_guestEntity)
    private _users_guestEntity: typeof users_guestEntity,
    private _AppGateway: AppGateway,
  ) {}

  async getData(req: any): Promise<any> {
    if (req.user.id_hotel == undefined) {
      throw 'Akun anda tidak memiliki hotel';
    }
    // console.log(req.user);
    let getAnnouncements = await this._announcementUserEntity.findAll({
      include: [
        {
          model: announcementEntity,
          as: 'announcement',
          required: true,
          where: {
            is_active: true,
            start_date: {
              [Op.lte]: fn('NOW'), // start_date >= NOW()
            },
            end_date: {
              [Op.gte]: fn('NOW'), // end_date <= NOW()
            },
          },
        },
      ],
      where: {
        id_user_device: req.user.id_user,
      },
      order: [['id_announcement_user', 'desc']],
    });
    let announcement = '';
    for (let i = 0; i < getAnnouncements.length; i++) {
      announcement += getAnnouncements[i].announcement.description;
      if (i < getAnnouncements.length - 1) {
        announcement += ', ';
      }
    }

    let nama = 'Guest';

    let getHotel = await this.iptv_featureModel.findOne({
      where: { id: req.user.id_hotel },
    });
    if (getHotel != null) {
      if (getHotel.api_guest != null) {
        //     const url=getHotel.api_method.toUpperCase()!='GET'?getHotel.api_guest:getHotel.api_guest+`/:${req.user.room_id}`;
        //     const data=getHotel.api_method.toUpperCase()!='GET'?{}:{room_id:req.user.room_id};
        //     const method: Method = getHotel.api_method==null?'GET' as Method:getHotel.api_method.toUpperCase() as Method;
        //     const config: AxiosRequestConfig = {
        //         method, // Metode yang diambil dari database
        //         url,
        //         headers: {
        //             'Authorization': getHotel.api_secret, // Tambahkan token ke Authorization header
        //         },
        //         data  // Body data untuk POST/PUT
        //       };
        //     // console.log(config);
        //     await axios(config)
        //         .then(response => {
        //             // Logic tambahan jika request berhasil
        //             console.log('Request Berhasil:', response.data);
        //             nama =response.data;
        //         })
        //         .catch(error => {
        //             // Logic tambahan jika request gagal
        //             console.error('Request Gagal:', error.message);
        //             // Menangani error lebih detail, misalnya berdasarkan status code
        //             if (error.response && error.response.status === 401) {
        //                 throw new HttpException('Unauthorized request', HttpStatus.UNAUTHORIZED);
        //             } else if (error.response && error.response.status === 404) {
        //                 throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
        //             } else {
        //                 throw new HttpException(
        //                     `HTTP Request failed: ${error.message}`,
        //                     HttpStatus.INTERNAL_SERVER_ERROR,
        //                 );
        //             }
        //         });
      } else {
        const userGuest = await this._users_guestEntity.findOne({
          where: {
            id_user_device: req.user.id_user,
            is_active: true,
            start_date: {
              [Op.lte]: fn('NOW'), // start_date >= NOW()
            },
            end_date: {
              [Op.gte]: fn('NOW'), // end_date <= NOW()
            },
          },
          order: [['id_user_guest', 'desc']],
        });
        if (userGuest != null) {
          nama = userGuest.nama_tamu;
        }
      }
    }

    const background = await this._backgroundUserEntity.findOne({
      include: [
        {
          model: backgroundEntity,
          as: 'background',
          required: true,
          where: {
            is_active: true,
            start_date: {
              [Op.lte]: fn('NOW'), // start_date >= NOW()
            },
            end_date: {
              [Op.gte]: fn('NOW'), // end_date <= NOW()
            },
          },
        },
      ],
      where: {
        id_user_device: req.user.id_user,
      },
      order: [['id_background_user', 'desc']],
    });

    const greetingCard = await this._greeting_cardUserEntity.findOne({
      include: [
        {
          model: this.greeting_cardModel,
          as: 'greeting_card',
          required: true,
          where: {
            is_active: true,
            start_date: {
              [Op.lte]: fn('NOW'), // start_date >= NOW()
            },
            end_date: {
              [Op.gte]: fn('NOW'), // end_date <= NOW()
            },
          },
        },
      ],
      where: {
        id_user_device: req.user.id_user,
      },
      order: [['id_greeting_card_user', 'desc']],
    });

    let selectChannel = `select tv.*,tg."group"
                from tv_channel tv
                inner join tv_group tg on tv.id_group=tg.id_group 
                WHERE is_active=true AND is_assign=true AND tv.id_hotel=${req.user.id_hotel}
                order by tv.urut;`;
    const channelData = await this.sequelize.query(selectChannel, {
      type: QueryTypes.SELECT,
    });

    let data = {
      nama: nama,
      iptv: getHotel,
      nearbyattraction: await this.nearby_attractionModel.findAll({
        where: { id_hotel: req.user.id_hotel },
      }),
      promo: await this.promoModel.findAll({
        where: { id_hotel: req.user.id_hotel, is_active: true },
        order: [['urut', 'DESC']],
      }),
      resto: await this.restoModel.findAll({
        attributes: [
          'id_resto',
          'image_name',
          'image_url',
          'title',
          'description',
          'harga',
          'id_hotel',
          [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
          'id_group',
          [this.sequelize.col('group.nama_group'), 'nama_group'],
        ],
        include: [
          {
            attributes: [],
            model: iptv_feature,
            as: 'hotel',
          },
          {
            attributes: [],
            model: restoGroupEntity,
            as: 'group',
          },
        ],
        where: { id_hotel: req.user.id_hotel },
      }),
      entertainmentModel: await this.entertainmentModel.findAll({
        where: { is_active: true },
      }),
      greetingcard: greetingCard != null ? greetingCard.greeting_card : null,
      background: background != null ? background.background : null,
      announcement: announcement,
      guesthotel: {
        hotel: await this.info_hotelModel.findOne({
          where: {
            id_hotel: req.user.id_hotel,
          },
          order: [['id', 'desc']],
        }),
        room: await this.info_roomModel.findAll({
          where: { id_hotel: req.user.id_hotel },
        }),
        fasilities: await this.info_fasilitiesModel.findAll({
          where: { id_hotel: req.user.id_hotel },
        }),
      },
      // channel: await this.tv_channelRepo.GetChannelActive(),
      channel: channelData,
    };
    return data;
  }

  async cekPin(pin: string, req: any): Promise<any> {
    try {
      if (req.user.id_hotel == undefined) {
        throw 'Akun anda tidak memiliki hotel';
      }
      let hotel = await this.iptv_featureModel.findOne({
        where: {
          id: req.user.id_hotel,
          is_active: true,
        },
      });
      if (!hotel) {
        throw 'Hotel tidak di temukan';
      }
      if (!(await bcrypt.compare(pin, hotel.pin))) {
        throw 'pin salah';
      }
      return 'success';
    } catch (error) {
      throw error;
    }
  }

  async sendWebsocketData(req: any, module: string, action: string) {
    // const data = await this.getData(req);
    const payloadData = {
      id_hotel: req.user.id_hotel,
      module: module,
      action: action,
      // data: data,
    };
    let send = this._AppGateway.handleMessageUpdateData(payloadData);
  }

  async palindromeService(input: string): Promise<number> {
    try {
      input = input.replace(/[^a-z]/g, '');
      const n = input.length;
      if (n == 0) return 0;

      let maxLength = 1;
      const table = Array.from({ length: n }, () => Array(n).fill(false));

      for (let i = 0; i < n; i++) {
        table[i][i] = true;
      }

      for (let length = 2; length <= n; length++) {
        for (let i = 0; i < n - length + 1; i++) {
          const j = i + length - 1;
          if (input[i] == input[j]) {
            if (length == 2 || table[i + 1][j - 1]) {
              table[i][j] = true;
              maxLength = Math.max(maxLength, length);
            }
          }
        }
      }
      return maxLength;
    } catch (error) {
      throw error;
    }
  }
}
