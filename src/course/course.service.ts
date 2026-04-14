import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {} // this InjectModel is for injecting mongoose model that will help to interact with mongodb and store user data
  
  //----------------Create Course-----------------
  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      // const isCourseAlreadyExist = await this.courseModel.findOne({title: createCourseDto.title});
      
      // if (isCourseAlreadyExist) {
      //   throw new ConflictException('course with this title already exists');
      // }
      const createdCourse = await this.courseModel.create(createCourseDto);
      if (!createdCourse) {
        return { message: 'Failed to create course' };
      }
      return {
        course: createdCourse,
        message: 'Course created successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async findAllCourses() {
    try {
      const allCourse = await this.courseModel.find();
      return allCourse;
    } catch (error) {
      throw error;
    }
  }

  async findOneCourse(title: string) {
    try {
      const course = await this.courseModel.findOne({ title });

      if (!course) {
        return { message: 'Course not found' };
      }
      return course;
    } catch (error) {
      throw error;
    }
  }

  updateCourse(title: string, updateCourseDto: UpdateCourseDto) {
    try {
      const isCourseExist = this.courseModel.findOne({title});
      if(!isCourseExist) return {message: 'Course not found'};

      const updatedCourse = this.courseModel.findOneAndUpdate({title}, updateCourseDto, {new: true});

      if(!updatedCourse) return {message: 'Failed to update course'};
      
      return {
        course: updatedCourse,
        message: 'Course updated successfully',
      };


    } catch (error) {
      throw error;
    }
  }

  async removeCourse(title: string) {
    try {
      const deletedCourse = await this.courseModel.findOneAndDelete({title});
      
      if(!deletedCourse) return {message: 'Course not found'};
      return {
        course: deletedCourse,
        message: 'Course deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
