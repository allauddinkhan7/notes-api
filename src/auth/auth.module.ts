import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/users.schema';
import { AuthGuard } from './auth.guard';
// module organizes related components together. for example, controllers and providers that handle authentication logic.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // to access env variables  
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' }, 
    }),
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ], 
  controllers: [AuthController],
  providers: [AuthService, AuthGuard], //When you list a class in providers, Nest automatically treats it as injectable, even without the decorator.
})
export class AuthModule {}
