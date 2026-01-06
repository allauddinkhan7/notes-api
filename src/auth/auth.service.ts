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
    private readonly jwtService: JwtService
  ) {}

  async registerUser(registerUserDto: RegisterDto) {
    /*  
      hash password
      check if user already exists
      save user to db -> this is where user service will come in picture
      generate jwt token
      return user and token in response
    */


    


    const hash = await bcrypt.hash(registerUserDto.password, 10);

    const user = await this.userService.createUser({...registerUserDto, password: hash});
     //now generate token
    const payload = { sub: user?._id }; //sub -> subject is a standard claim in JWT that is used to identify the principal that is the subject of the JWT. you can name it anything
    const token = await this.jwtService.signAsync(payload); //signAsync in express ->  jwt.sign(payload, secretKey, options)
    
    console.log("user......", token);

    return {user: user, token: token, message: 'User registered successfully'};
  } //inject this method in auth controller. The @Injectable() decorator is not strictly required if the class is explicitly listed in a module’s providers.




  async loginUser(loginUserDto: LoginDto){
    /*
      check if user exists
      compare password
      generate jwt token
      return user and token in response
    */
    const user = await this.userService.getUserByEmail({...loginUserDto});
    //check password is correct or not
    const isPasswordValid = user ? await bcrypt.compare(loginUserDto.password, user.password) : false;
    if(!isPasswordValid){
      return {message: 'Invalid credentials'};
    }

    //if password is valid then generate token

    const payload = { sub: user?._id };
    const token = await this.jwtService.signAsync(payload);
    console.log("login user token......", token);
    return {user: user, token: token, message: 'User logged in successfully'};


  }
}
