import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateDto } from './dto/updateUser.dto';
import { DeleteDto } from './dto/deleteDto..dto';
import { AuthGuard } from 'src/auth/auth.guard';
import * as express from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update') // user/update
  updateUser(@Body() updateUserDto: UpdateDto) {
    const updatedUser = this.userService.updateUser(updateUserDto);
    return updatedUser;
  }

  @Delete('delete') // user/delete
  deleteUser(@Body() deleteUserDto: DeleteDto) {
    const deletedUser = this.userService.deleteUser(deleteUserDto);
    return deletedUser
      .then((res) => ({ response: res }))
      .catch((err) => ({ message: 'Error deleting user', error: err }));
  }

  @UseGuards(AuthGuard)
  @Post('logout')
 async logout(@Req() req, @Res({ passthrough: true }) res: express.Response) {
    
    // 1. Update Database via Service
    await this.userService.removeRefreshToken(req.user._id);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

    // 2. Clear Cookies
    res.clearCookie('accessToken', options);
    res.clearCookie('refreshToken', options);

    // 3. Return JSON (NestJS handles the ApiResponse formatting)
    return {
      statusCode: 200,
      data: {},
      message: 'User logged Out',
    };
  }
}
