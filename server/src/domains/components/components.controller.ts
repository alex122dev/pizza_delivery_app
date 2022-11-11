import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { ComponentsService } from './components.service';
import { ComponentDto } from './dto/component.dto';

@Controller('components')
export class ComponentsController {
  constructor(private componentsService: ComponentsService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<ComponentDto[]> {
    return this.componentsService.getAll();
  }
}
