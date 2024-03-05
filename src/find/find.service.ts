import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import {PlanDto} from "../dto/plan.dto";
dotenv.config();
@Injectable()
export class FindService {
  async getPlan(info: PlanDto) {
    const apiUrl = 'https://apis.openapi.sk.com/transit/routes';
    const apiKey = process.env.SK_APIKEY;
    const requestData = {
      startX: info.startX,
      startY: info.startY,
      endX: info.endX,
      endY: info.endY,
      lang: 0,
      format: 'json',
      count: 10,
    };

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          appKey: apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
