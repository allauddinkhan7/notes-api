import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';

@Injectable() // This decorator is optional here because the service is already listed in the module’s providers array of a module.
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //----------- Register -----------------
  async registerUser(registerUserDto: RegisterDto) {
    const hash = await bcrypt.hash(registerUserDto.password, 10);
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    //now generate token for created user
    const payload = { sub: user?._id };
    const token = await this.jwtService.signAsync(payload); //signAsync in express ->  jwt.sign(payload, secretKey, options)

    return { user, token };
  }

  //-----------Login-----------------
  async loginUser(loginUserDto: LoginDto) {
    const user = await this.userService.getUserByEmail({ ...loginUserDto });
    const isPasswordValid = user
      ? await bcrypt.compare(loginUserDto.password, user.password)
      : false;
    if (!isPasswordValid) {
      return { message: 'Invalid credentials' };
    }

    const payload = { sub: user?._id };
    const token = await this.jwtService.signAsync(payload);
    return { user: user, token: token, message: 'User logged in successfully' };
  }
}
