import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma-service';
import { UserModule } from './models/user/user.module';
import { PrismaModule } from './database/prisma.module';
import { LoginModule } from './auth/login/login.module';
import { CategoryModule } from './models/category/category.module';
import { FilesModule } from './models/files/files.module';
import { PaymentModule } from './models/payment/payment.module';
import { OrdersModule } from './models/orders/orders.module';

@Module({
  imports: [UserModule, PrismaModule, LoginModule, CategoryModule, FilesModule, PaymentModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
