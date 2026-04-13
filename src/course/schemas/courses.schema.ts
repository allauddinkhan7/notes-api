import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  //@properties
  //field name, type, validation rules, etc. goes here
  @Prop({ required: true }) // Ensure unique is set here
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
