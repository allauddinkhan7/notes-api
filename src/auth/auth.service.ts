import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';
import { Types } from 'mongoose';

@Injectable() // This decorator is optional here because the service is already listed in the module’s providers array of a module.
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // ----------- Helper for Tokens -----------------
  async generateAccessAndRefreshTokens(userId: any, role: any) {
    const payload = { sub: userId, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m', // Short lived
      secret: process.env.ACCESS_TOKEN_SECRET,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d', // Long lived
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    return { accessToken, refreshToken };
  }

  //----------- Register -----------------
  async registerUser(registerUserDto: RegisterDto) {
    const hash = await bcrypt.hash(registerUserDto.password, 10);
    const user = await this.userService.createUser({ ...registerUserDto,password: hash });

    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshTokens(user?._id, user?.role);

    // 3. Save Refresh Token to DB (Persistence)
    if (user) {
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
    }

    // now generate token for created user
    // const payload = { sub: user?._id, role: user?.role };
    // const token = await this.jwtService.signAsync(payload); //signAsync in express ->  jwt.sign(payload, secretKey, options)

    // return { user, token };
    return {
      user,
      accessToken, 
      refreshToken,
    };
  }

  //-----------Login-----------------
  async loginUser(loginUserDto: LoginDto) {
    const user = await this.userService.getUserByEmail({ ...loginUserDto }); // userExist?

    const isPasswordValid = user
      ? await bcrypt.compare(loginUserDto.password, user.password)
      : false;

    if (!isPasswordValid) return { message: 'Invalid credentials' };

    const payload = { sub: user?._id, role: user?.role };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '3600s',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    await this.userService.updateRefreshToken(
      user?._id as Types.ObjectId,
      refreshToken,
    );

    return {
      user: user,
      accessToken,
      refreshToken,
      message: 'User logged in successfully',
    };
  }
}
