
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../user.types';
export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: '__v' })
export class User {
  //@properties
  //field name, type, validation rules, etc. goes here
  @Prop({required: true})
  fname: string;

  @Prop({required: true})
  lname: string;

  @Prop({required: true, unique: true })
  email: string; 

  @Prop({required: true})
  password: string;

  @Prop({default: Role.ADMIN, enum: Object.values(Role)})
  role: Role;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
