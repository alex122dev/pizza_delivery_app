import { AxiosResponse } from 'axios';
import { StatusDto } from '../dtos/orders/Status.dto';
import { $api } from '../http/http';

export class StatusesService {
  static async getAll(): Promise<AxiosResponse<StatusDto[]>> {
    return $api.get<StatusDto[]>('/statuses');
  }
}
