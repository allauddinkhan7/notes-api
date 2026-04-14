// define the shape of data we expect from client

import { IsEmail, IsString, IsStrongPassword, IsEnum, IsOptional } from "class-validator";
import { Role } from "src/user/user.types";

export class RegisterDto{
    @IsString() //
    fname: string;
    @IsString()
    lname: string;
    @IsEmail()
    email: string;
    @IsStrongPassword()
    password: string;
    @IsOptional()
    @IsEnum(Role)
    role?: Role = Role.STUDENT;
}