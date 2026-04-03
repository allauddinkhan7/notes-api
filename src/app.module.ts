import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // must be FIRST
    MongooseModule.forRoot(process.env.MONGODB_URL as string),
    AuthModule,
    UserModule,
    // PaymentModule,
    // ProductModule,
    // OrderModule,
  ],
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     host: '10.10.1.87',
  //     port: 5436,
  //     username: 'postgres',
  //     password: 'postgres890',
  //     database: 'CAMS_DB_DESIGN',

  //     autoLoadEntities: true,
  //     entities: [__dirname + '/**/*.entity{.ts,.js}'],

  //     synchronize: false,
  //   }),


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
