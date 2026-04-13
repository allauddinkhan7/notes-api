import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import * as express from 'express';
@Controller('auth') // /auth
export class AuthController {
  //1 way to inject service in controller

  /*
  authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  */

  //2 way to inject service in controller
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {} //readonly -> once the value is assigned in constructor cannot be reassigned.

  //----------- Register -----------------
  @Post('register') //                       /auth/register
  async register(
    @Body() registerUserDto: RegisterDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    //@Body() decorator to extract data from request body
    if (!registerUserDto.fname?.trim() || !registerUserDto.lname?.trim() || !registerUserDto.email?.trim() || !registerUserDto.password?.trim()) {
      return { msg: 'All fields are required' };
    }
    //sending Response Notes.sendingResponse
    const result = await this.authService.registerUser(registerUserDto);
    const example = 10;
    response.cookie('access_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production
      sameSite: 'strict',
    });
    return {
      message: 'User registered successfully',
      user: result.user,
    };
  }

  //-----------Login-----------------

  @Post('login') //                       /auth/login
  async login(@Body() loginUserDto: LoginDto) {
    if (!loginUserDto.email?.trim() || !loginUserDto.password?.trim()) {
      return { msg: 'All fields are required' };
    }

    const token = await this.authService.loginUser(loginUserDto);
    return token;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user.sub;
    const fetchedUser = await this.userService.getUserById(userId);
    return { msg: 'User Fetched Successfully', fetchedUser };
  }

  // router.route("/change-password").post(verifyJwt, changeCurrentPassword);
  // @Post('changePassword')
}
