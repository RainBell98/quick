import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class FindService {
  async getPlan() {
    const apiUrl = 'https://apis.openapi.sk.com/transit/routes';
    const apiKey = process.env.SK_APIKEY;
    const requestData = {
      startX: '126.926493082645',
      startY: '37.6134436427887',
      endX: '127.126936754911',
      endY: '37.5004198786564',
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
