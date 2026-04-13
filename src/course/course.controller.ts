import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse({...createCourseDto, title: createCourseDto.title.trim()});
  }

  @Get()
  findAllCourses() {
    return this.courseService.findAllCourses();
  }

  @Get(':title') 
  findOneCourse(@Param('title') title: string) {
    console.log("in controller", title)
    return this.courseService.findOneCourse(title);
  }

  @Patch(':title')
  updateCourse(@Param('title') title: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(title, updateCourseDto);
  }

  @Delete(':title')
  removeCourse(@Param('title') title: string) {
    console.log("first")
    return this.courseService.removeCourse(title);
  }

  
}
