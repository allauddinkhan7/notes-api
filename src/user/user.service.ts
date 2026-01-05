import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateDto } from './dto/updateUser.dto';
import { LoginDto } from 'src/auth/dto/loginUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User> ){}// this InjectModel is for injecting mongoose model that will help to interact with mongodb and store user data
    
 


    async createUser(registerUserDto: RegisterDto){
       try {
         //create user in db logic goes here 
        return await this.userModel.create(registerUserDto);
       } catch (error) {
        if(error.code === 11000)    
            throw new ConflictException('User with this email already exists');
       }
        
    }


    async updateUser(updateUserDto: UpdateDto){
        const { email, ...updateData } = updateUserDto;
        console.log(".................", updateData)
        const updatedUser = await this.userModel.findOneAndUpdate(
            {email},
            updateData,
            { new: true } // to return the updated document
        ).select('-password'); // 👈 exclude password field

        return updatedUser;
    }



    async getUserByEmail(loginUserDto: LoginDto){
        const { email } = loginUserDto;
        const user = await this.userModel.findOne({ email });
        console.log("loginUserDto...::::::::::::::::::", user);

        //compare password logic will be in auth service



        return user;

    }

}
