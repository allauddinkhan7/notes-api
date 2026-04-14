import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/user.types';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN) // Only Admin can create, update, delete courses

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
