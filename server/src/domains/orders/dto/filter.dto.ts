import { StatusDto } from '../../statuses/dto/status.dto';

export class FilterDto {
  id?: number;
  userId?: number;
  status?: StatusDto;
}
