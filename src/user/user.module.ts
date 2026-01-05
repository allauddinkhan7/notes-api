import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService], //when using it in other modules like AuthModule 
  controllers: [UserController], // Modules are isolated in nestJs so you have to explicitly export to use it another module (like AuthModule).
})
export class UserModule {}
