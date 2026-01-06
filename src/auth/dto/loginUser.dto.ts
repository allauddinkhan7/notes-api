// define the shape of data we expect from client

import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginDto{
    @IsEmail()
    email: string;
    password: string;
}