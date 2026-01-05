import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
// module organizes related components together. for example, controllers and providers that handle authentication logic.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // to access env variables  
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10s' },
    }),
    UserModule,
  ], 
  controllers: [AuthController],
  providers: [AuthService], //When you list a class in providers, Nest automatically treats it as injectable, even without the decorator.
})
export class AuthModule {}
