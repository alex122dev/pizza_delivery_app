import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { StatusesModule } from '../statuses/statuses.module';
import { UsersModule } from '../users/users.module';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order]),
    StatusesModule,
    UsersModule,
    AuthModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
