import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateDto } from './dto/updateUser.dto';
import { LoginDto } from 'src/auth/dto/loginUser.dto';
import { DeleteDto } from './dto/deleteDto..dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User> ){}// this InjectModel is for injecting mongoose model that will help to interact with mongodb and store user data
    
    

    //----------------Create User-----------------
     
    async createUser(registerUserDto: RegisterDto){
       try {
         //create user in db logic goes here 
        return await this.userModel.create(registerUserDto);
       } catch (error) {
        if(error.code === 11000)//11000 - duplicate key error code in mongodb    
            throw new ConflictException('User with this email already exists');
       }
        
    }




    //----------------Update User-----------------

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


    //----------------Delete User-----------------

     async deleteUser(deleteUserDto: DeleteDto){
        const { _id } = deleteUserDto;
        console.log("is services ............................", _id)
        const deletedUser = await this.userModel.findByIdAndDelete(_id);
        if(!deletedUser){
            throw new ConflictException('User with this email does not exist');
        }
        return deletedUser;
    }


    //----------------Get User By Email-----------------

    async getUserByEmail(loginUserDto: LoginDto){
        const { email } = loginUserDto;
        const user = await this.userModel.findOne({ email });
        console.log("loginUserDto...::::::::::::::::::", user);
        return user;
    }



   

}
