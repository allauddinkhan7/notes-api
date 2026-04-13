import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { ConfigModule } from '@nestjs/config';
import { Course, CourseSchema } from './schemas/courses.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]) //register course schema in course module
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
