import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';

@Controller('auth')// /auth                                                                                                                                                                                                        
export class AuthController {
  //1 way to inject service in controller

  /*
  authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  */

  //2 way to inject service in controller
  constructor(private readonly authService: AuthService) {}

  
  //----------- Register -----------------

  @Post('register') 
  register(@Body() registerUserDto: RegisterDto) {//@Body() decorator to extract data from request body
    if (!registerUserDto.fname?.trim() || !registerUserDto.lname?.trim() || !registerUserDto.email?.trim() || !registerUserDto.password?.trim()){
      return {msg: 'All fields are required'};
    }

    const token = this.authService.registerUser(registerUserDto);
    return token;
  }




  //-----------Login-----------------

  @Post('login') //                       /auth/login
  async login(@Body() loginUserDto: LoginDto){

    if (!loginUserDto.email?.trim() || !loginUserDto.password?.trim()){
      return {msg: 'All fields are required'};
    }

    const token = await this.authService.loginUser(loginUserDto);
    return token;

  }












}
