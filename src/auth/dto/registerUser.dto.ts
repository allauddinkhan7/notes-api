// define the shape of data we expect from client

import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class RegisterDto{
    @IsString() //
    fname: string;
    @IsString()
    lname: string;
    @IsEmail()
    email: string;
    @IsStrongPassword()
    password: string;
}