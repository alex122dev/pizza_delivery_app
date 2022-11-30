import { AxiosResponse } from 'axios';
import { ComponentDto } from '../dtos/components/component.dto';
import { $api } from '../http/http';

export class ComponentsService {
  static async getAll(): Promise<AxiosResponse<ComponentDto[]>> {
    return $api.get<ComponentDto[]>('/components');
  }
}
