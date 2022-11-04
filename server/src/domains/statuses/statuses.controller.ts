import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { StatusDto } from './dto/status.dto';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(private statusesService: StatusesService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getAll(): Promise<StatusDto[]> {
    return this.statusesService.getAll();
  }
}
