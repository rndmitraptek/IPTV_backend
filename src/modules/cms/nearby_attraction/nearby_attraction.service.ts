import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { nearby_attraction } from 'src/database/iptv/nearby_attraction.entity';
import { nearby_attractionDtoInsert } from './nearby_attraction.dto';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class NearbyAttractionService {
  constructor(
    @InjectModel(nearby_attraction)
    private nearby_attractionModel: typeof nearby_attraction,
    private _ApkService: ApkService,
  ) {}

  findAll(req: any): Promise<nearby_attraction[]> {
    try {
      return this.nearby_attractionModel.findAll({
        where: { id_hotel: req.user.id_hotel },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id_nearby_attraction: number): Promise<nearby_attraction> {
    return this.nearby_attractionModel.findOne({
      where: {
        id_nearby_attraction: id_nearby_attraction,
      },
    });
  }

  async create(
    _nearby_attraction: nearby_attractionDtoInsert,
    req: any,
  ): Promise<nearby_attraction> {
    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'nearby_attraction',
        'create',
      );
    }

    delete _nearby_attraction['id_nearby_attraction'];
    _nearby_attraction['id_hotel'] = req.user.id_hotel;
    return this.nearby_attractionModel.create(_nearby_attraction);
  }

  async update(
    id_nearby_attraction: number,
    _nearby_attraction: nearby_attractionDtoInsert,
    req: any,
  ): Promise<void> {
    await this.nearby_attractionModel.update(_nearby_attraction, {
      where: {
        id_nearby_attraction: id_nearby_attraction,
      },
    });

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'nearby_attraction',
        'update',
      );
    }
  }

  async remove(id_nearby_attraction: number, req: any): Promise<void> {
    const nearby_attraction = await this.findOne(id_nearby_attraction);
    await nearby_attraction.destroy();

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'nearby_attraction',
        'delete',
      );
    }
  }
}
