import { IsNumber, IsString } from 'class-validator';

export class UpdateCourseDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
